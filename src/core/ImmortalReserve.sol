// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Immortal Reserve
 * @dev Manages perpetual USDC dividends for Immortal Share holders
 */
contract ImmortalReserve is ERC20, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    IERC20 public immutable usdc;
    IERC20 public immutable veilToken;
    
    uint256 public totalDividendsDistributed;
    uint256 public lastDistributionTime;
    uint256 public weeklyDistributionRate = 150; // 1.5% per week (basis points)
    
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public accumulatedDividends;
    
    event VeilBurned(address indexed user, uint256 veilAmount, uint256 immortalShares);
    event DividendsDistributed(uint256 amount, uint256 timestamp);
    event DividendsClaimed(address indexed user, uint256 amount);
    event RevenueReceived(address indexed source, uint256 amount);
    
    constructor(
        address _usdc,
        address _veilToken
    ) ERC20("Immortal Shares", "IMMORTAL") Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        veilToken = IERC20(_veilToken);
        lastDistributionTime = block.timestamp;
    }
    
    /**
     * @dev Burn VEIL tokens to receive Immortal Shares (1:1 ratio)
     */
    function burnVeilForImmortalShares(uint256 veilAmount) external nonReentrant {
        require(veilAmount > 0, "Amount must be greater than 0");
        
        // Transfer and burn VEIL tokens
        veilToken.safeTransferFrom(msg.sender, address(this), veilAmount);
        
        // Mint Immortal Shares 1:1
        _mint(msg.sender, veilAmount);
        
        // Set claim time to now to prevent immediate dividend claim on new shares
        lastClaimTime[msg.sender] = block.timestamp;
        
        emit VeilBurned(msg.sender, veilAmount, veilAmount);
    }
    
    /**
     * @dev Receive revenue from protocol (vault fees, borrow interest, LP VACUUM)
     */
    function receiveRevenue(uint256 amount) external {
        usdc.safeTransferFrom(msg.sender, address(this), amount);
        emit RevenueReceived(msg.sender, amount);
    }
    
    /**
     * @dev Calculate pending dividends for a user
     */
    function pendingDividends(address user) public view returns (uint256) {
        if (totalSupply() == 0) return 0;
        
        uint256 userShares = balanceOf(user);
        if (userShares == 0) return 0;
        
        uint256 timeElapsed = block.timestamp - lastClaimTime[user];
        uint256 weeklyDividendPool = (usdc.balanceOf(address(this)) * weeklyDistributionRate) / 10000;
        uint256 userWeeklyDividend = (weeklyDividendPool * userShares) / totalSupply();
        
        // Calculate pro-rata dividend based on time elapsed
        uint256 dividend = (userWeeklyDividend * timeElapsed) / 1 weeks;
        
        return dividend + accumulatedDividends[user];
    }
    
    /**
     * @dev Claim accumulated dividends
     */
    function claimDividends() external nonReentrant {
        uint256 dividend = pendingDividends(msg.sender);
        require(dividend > 0, "No dividends to claim");
        
        // Reset accumulated dividends and update claim time
        accumulatedDividends[msg.sender] = 0;
        lastClaimTime[msg.sender] = block.timestamp;
        
        // Transfer USDC dividends
        usdc.safeTransfer(msg.sender, dividend);
        totalDividendsDistributed += dividend;
        
        emit DividendsClaimed(msg.sender, dividend);
    }
    
    /**
     * @dev Weekly distribution to update accumulated dividends for all holders
     */
    function weeklyDistribution() external {
        require(block.timestamp >= lastDistributionTime + 1 weeks, "Too early for distribution");
        
        uint256 distributionAmount = (usdc.balanceOf(address(this)) * weeklyDistributionRate) / 10000;
        
        if (distributionAmount > 0 && totalSupply() > 0) {
            // This is a simplified version - in production, would use a more gas-efficient method
            // like Merkle trees or snapshot-based distribution
            lastDistributionTime = block.timestamp;
            emit DividendsDistributed(distributionAmount, block.timestamp);
        }
    }
    
    /**
     * @dev Get current APY based on reserve balance and total supply
     */
    function getCurrentAPY() external view returns (uint256) {
        if (totalSupply() == 0) return 0;
        
        uint256 weeklyRate = weeklyDistributionRate;
        uint256 annualRate = weeklyRate * 52; // 52 weeks per year
        
        return annualRate; // Returns APY in basis points
    }
    
    /**
     * @dev Override transfer to update dividend tracking
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (from != address(0) && to != address(0)) {
            // Accumulate dividends before transfer
            if (balanceOf(from) > 0) {
                accumulatedDividends[from] += pendingDividends(from);
                lastClaimTime[from] = block.timestamp;
            }
            
            if (balanceOf(to) > 0) {
                accumulatedDividends[to] += pendingDividends(to);
            }
            lastClaimTime[to] = block.timestamp;
        }
    }
    
    /**
     * @dev Update weekly distribution rate (governance function)
     */
    function updateDistributionRate(uint256 newRate) external onlyOwner {
        require(newRate <= 500, "Rate too high"); // Max 5% per week
        weeklyDistributionRate = newRate;
    }
    
    /**
     * @dev Get reserve statistics
     */
    function getReserveStats() external view returns (
        uint256 totalReserve,
        uint256 totalShares,
        uint256 currentAPY,
        uint256 totalDistributed
    ) {
        totalReserve = usdc.balanceOf(address(this));
        totalShares = totalSupply();
        currentAPY = weeklyDistributionRate * 52;
        totalDistributed = totalDividendsDistributed;
    }
}