// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RateLimiter {
    struct Limit {
        uint256 amount;
        uint256 window;
        uint256 lastReset;
        uint256 currentAmount;
    }
    
    mapping(address => mapping(bytes32 => Limit)) public limits;
    
    function setLimit(bytes32 action, uint256 amount, uint256 window) internal {
        limits[msg.sender][action] = Limit({
            amount: amount,
            window: window,
            lastReset: block.timestamp,
            currentAmount: 0
        });
    }
    
    function checkLimit(bytes32 action, uint256 amount) internal {
        Limit storage limit = limits[msg.sender][action];
        
        if (block.timestamp >= limit.lastReset + limit.window) {
            limit.lastReset = block.timestamp;
            limit.currentAmount = 0;
        }
        
        require(limit.currentAmount + amount <= limit.amount, "Rate limit exceeded");
        limit.currentAmount += amount;
    }
}
