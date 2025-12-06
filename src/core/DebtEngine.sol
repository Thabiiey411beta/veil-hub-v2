// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../libraries/SafeMath.sol";
import "../interfaces/IDebtEngine.sol";

/**
 * @title Debt Engine
 * @dev Zero-liquidation borrowing at 5.5% fixed APR
 */
contract DebtEngine is IDebtEngine, Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;
    using VeilMath for uint256;
    
    struct Position {
        uint256 collateralAmount;
        uint256 debtAmount;
        uint256 lastUpdate;
        address collateralAsset;
        bool active;
    }
    
    mapping(address => Position) public positions;
    mapping(address => bool) public supportedCollateral;
    mapping(address => uint256) public collateralPrices;
    
    address public oracleContract;
    uint256 public emergencyShutdownTime;
    bool public emergencyShutdown;
    
    uint256 public constant FIXED_INTEREST_RATE = 550; // 5.5% in basis points
    uint256 public constant MIN_COLLATERAL_RATIO = 18000; // 180% in basis points
    uint256 public constant LIQUIDATION_THRESHOLD = 12000; // 120% in basis points
    
    address public immutable usdc;
    address public immutable stabilityPool;
    address public immutable immortalReserve;
    address public immutable veVeilGauge;
    address public immutable treasury;
    
    uint256 public totalDebt;
    uint256 public totalCollateralValue;
    
    event PositionOpened(
        address indexed user,
        address collateralAsset,
        uint256 collateralAmount,
        uint256 debtAmount
    );
    
    event PositionClosed(address indexed user, uint256 debtRepaid);
    event InterestAccrued(address indexed user, uint256 interestAmount);
    event AutoRepayExecuted(address indexed user, uint256 repayAmount);
    
    constructor(
        address _usdc,
        address _stabilityPool,
        address _immortalReserve,
        address _veVeilGauge,
        address _treasury
    ) Ownable(msg.sender) {
        usdc = _usdc;
        stabilityPool = _stabilityPool;
        immortalReserve = _immortalReserve;
        veVeilGauge = _veVeilGauge;
        treasury = _treasury;
    }
    
    /**
     * @dev Open a borrowing position
     */
    function openPosition(
        address collateralAsset,
        uint256 collateralAmount,
        uint256 borrowAmount
    ) external override nonReentrant whenNotPaused {
        require(supportedCollateral[collateralAsset], "Unsupported collateral");
        require(!positions[msg.sender].active, "Position already exists");
        require(collateralAmount > 0, "Invalid collateral amount");
        require(borrowAmount > 0, "Invalid borrow amount");
        
        uint256 collateralValue = getCollateralValue(collateralAsset, collateralAmount);
        uint256 collateralRatio = VeilMath.calculateCollateralRatio(collateralValue, borrowAmount);
        
        require(collateralRatio >= MIN_COLLATERAL_RATIO, "Insufficient collateral");
        
        // Transfer collateral
        IERC20(collateralAsset).safeTransferFrom(msg.sender, address(this), collateralAmount);
        
        // Mint USDC debt
        IERC20(usdc).safeTransfer(msg.sender, borrowAmount);
        
        positions[msg.sender] = Position({
            collateralAmount: collateralAmount,
            debtAmount: borrowAmount,
            lastUpdate: block.timestamp,
            collateralAsset: collateralAsset,
            active: true
        });
        
        totalDebt += borrowAmount;
        totalCollateralValue += collateralValue;
        
        emit PositionOpened(msg.sender, collateralAsset, collateralAmount, borrowAmount);
    }
    
    /**
     * @dev Repay debt and close position
     */
    function closePosition() external override nonReentrant {
        Position storage position = positions[msg.sender];
        require(position.active, "No active position");
        
        uint256 totalDebt = calculateTotalDebt(msg.sender);
        
        // Repay debt
        IERC20(usdc).safeTransferFrom(msg.sender, address(this), totalDebt);
        
        // Return collateral
        IERC20(position.collateralAsset).safeTransfer(msg.sender, position.collateralAmount);
        
        // Distribute interest: 50% Immortal, 30% Buyback, 20% veVEIL
        uint256 interest = totalDebt - position.debtAmount;
        if (interest > 0) {
            uint256 toImmortal = (interest * 5000) / 10000;
            uint256 toBuyback = (interest * 3000) / 10000;
            uint256 toVeVeil = (interest * 2000) / 10000;
            
            IERC20(usdc).safeTransfer(immortalReserve, toImmortal);
            IERC20(usdc).safeTransfer(treasury, toBuyback); // Treasury = Buyback Engine
            IERC20(usdc).safeTransfer(veVeilGauge, toVeVeil);
        }
        
        totalDebt -= position.debtAmount;
        totalCollateralValue -= getCollateralValue(position.collateralAsset, position.collateralAmount);
        
        delete positions[msg.sender];
        
        emit PositionClosed(msg.sender, totalDebt);
    }
    
    /**
     * @dev Calculate total debt including accrued interest
     */
    function calculateTotalDebt(address user) public view override returns (uint256) {
        Position memory position = positions[user];
        if (!position.active) return 0;
        
        uint256 timeElapsed = block.timestamp - position.lastUpdate;
        uint256 accruedInterest = VeilMath.calculateInterest(
            position.debtAmount,
            FIXED_INTEREST_RATE,
            timeElapsed
        );
        
        return position.debtAmount + accruedInterest;
    }
    
    /**
     * @dev Get collateral value in USD
     */
    function getCollateralValue(address asset, uint256 amount) public view returns (uint256) {
        uint256 price = collateralPrices[asset];
        require(price > 0, "Price not set");
        
        // Assuming 18 decimal collateral and 8 decimal price
        return (amount * price) / 10**8;
    }
    
    /**
     * @dev Check if position is at risk (for auto-repay trigger)
     */
    function isPositionAtRisk(address user) external view override returns (bool) {
        Position memory position = positions[user];
        if (!position.active) return false;
        
        uint256 collateralValue = getCollateralValue(position.collateralAsset, position.collateralAmount);
        uint256 totalDebt = calculateTotalDebt(user);
        uint256 collateralRatio = VeilMath.calculateCollateralRatio(collateralValue, totalDebt);
        
        return collateralRatio < LIQUIDATION_THRESHOLD;
    }
    
    /**
     * @dev Update collateral price (oracle integration)
     */
    function updatePrice(address asset, uint256 price) external onlyOwner {
        collateralPrices[asset] = price;
    }
    
    /**
     * @dev Add supported collateral
     */
    function addCollateral(address asset) external onlyOwner {
        require(asset != address(0), "Invalid asset");
        supportedCollateral[asset] = true;
    }
    
    function setOracleContract(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle");
        oracleContract = _oracle;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function emergencyWithdraw() external nonReentrant {
        require(emergencyShutdown, "Not in emergency mode");
        Position storage position = positions[msg.sender];
        require(position.active, "No active position");
        
        IERC20(position.collateralAsset).safeTransfer(msg.sender, position.collateralAmount);
        delete positions[msg.sender];
    }
}