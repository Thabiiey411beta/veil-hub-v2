// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenDistribution is Ownable {
    using SafeERC20 for IERC20;
    
    IERC20 public immutable veil;
    
    struct Allocation {
        uint256 total;
        uint256 released;
        uint256 start;
        uint256 duration;
        uint256 cliff;
    }
    
    mapping(address => Allocation) public allocations;
    
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18;
    
    // Distribution breakdown
    uint256 public constant IMMORTAL_RESERVE = 200_000_000 * 10**18; // 20%
    uint256 public constant TEAM = 150_000_000 * 10**18; // 15%
    uint256 public constant INVESTORS = 100_000_000 * 10**18; // 10%
    uint256 public constant LIQUIDITY_MINING = 250_000_000 * 10**18; // 25%
    uint256 public constant TREASURY = 200_000_000 * 10**18; // 20%
    uint256 public constant COMMUNITY = 100_000_000 * 10**18; // 10%
    
    event AllocationCreated(address indexed beneficiary, uint256 amount, uint256 duration);
    event TokensReleased(address indexed beneficiary, uint256 amount);
    
    constructor(address _veil) Ownable(msg.sender) {
        veil = IERC20(_veil);
    }
    
    function createAllocation(
        address beneficiary,
        uint256 amount,
        uint256 duration,
        uint256 cliff
    ) external onlyOwner {
        require(allocations[beneficiary].total == 0, "Already allocated");
        
        allocations[beneficiary] = Allocation({
            total: amount,
            released: 0,
            start: block.timestamp,
            duration: duration,
            cliff: cliff
        });
        
        emit AllocationCreated(beneficiary, amount, duration);
    }
    
    function release() external {
        Allocation storage allocation = allocations[msg.sender];
        require(allocation.total > 0, "No allocation");
        require(block.timestamp >= allocation.start + allocation.cliff, "Cliff not reached");
        
        uint256 releasable = getReleasableAmount(msg.sender);
        require(releasable > 0, "Nothing to release");
        
        allocation.released += releasable;
        veil.safeTransfer(msg.sender, releasable);
        
        emit TokensReleased(msg.sender, releasable);
    }
    
    function getReleasableAmount(address beneficiary) public view returns (uint256) {
        Allocation memory allocation = allocations[beneficiary];
        if (allocation.total == 0) return 0;
        if (block.timestamp < allocation.start + allocation.cliff) return 0;
        
        uint256 timeElapsed = block.timestamp - allocation.start;
        if (timeElapsed >= allocation.duration) {
            return allocation.total - allocation.released;
        }
        
        uint256 vested = (allocation.total * timeElapsed) / allocation.duration;
        return vested - allocation.released;
    }
}
