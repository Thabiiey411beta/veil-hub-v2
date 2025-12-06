// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VeilVault is ERC4626, ReentrancyGuard, Pausable, Ownable {
    uint256 public performanceFee;
    uint256 public lastHarvest;
    uint256 public totalHarvested;
    
    address public immutable feeRecipient;
    address public immutable immortalReserve;
    address public strategy;
    
    event Harvested(uint256 profit, uint256 fee, uint256 timestamp);
    event StrategyUpdated(address indexed newStrategy);
    
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        uint256 _performanceFee,
        address _feeRecipient,
        address _immortalReserve
    ) ERC4626(_asset) ERC20(_name, _symbol) Ownable(msg.sender) {
        require(_performanceFee <= 1000, "Fee too high");
        performanceFee = _performanceFee;
        feeRecipient = _feeRecipient;
        immortalReserve = _immortalReserve;
        lastHarvest = block.timestamp;
    }
    
    function deposit(uint256 assets, address receiver) 
        public 
        override 
        nonReentrant 
        whenNotPaused 
        returns (uint256) 
    {
        return super.deposit(assets, receiver);
    }
    
    function withdraw(uint256 assets, address receiver, address owner)
        public
        override
        nonReentrant
        returns (uint256)
    {
        return super.withdraw(assets, receiver, owner);
    }
    
    function harvest() external onlyOwner nonReentrant returns (uint256) {
        require(block.timestamp >= lastHarvest + 1 days, "Too soon");
        
        uint256 beforeBalance = IERC20(asset()).balanceOf(address(this));
        // Strategy harvest logic here
        uint256 afterBalance = IERC20(asset()).balanceOf(address(this));
        
        uint256 profit = afterBalance > beforeBalance ? afterBalance - beforeBalance : 0;
        
        if (profit > 0) {
            uint256 fee = (profit * performanceFee) / 10000;
            uint256 burned = (fee * 50) / 100;
            uint256 toImmortal = (fee * 30) / 100;
            uint256 toVeVeil = fee - burned - toImmortal;
            
            IERC20(asset()).transfer(feeRecipient, burned);
            IERC20(asset()).transfer(immortalReserve, toImmortal);
            IERC20(asset()).transfer(feeRecipient, toVeVeil);
            
            totalHarvested += profit;
            lastHarvest = block.timestamp;
            
            emit Harvested(profit, fee, block.timestamp);
        }
        
        return profit;
    }
    
    function setStrategy(address _strategy) external onlyOwner {
        require(_strategy != address(0), "Invalid strategy");
        strategy = _strategy;
        emit StrategyUpdated(_strategy);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function totalAssets() public view override returns (uint256) {
        return IERC20(asset()).balanceOf(address(this));
    }
}
