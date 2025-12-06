// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CircuitBreaker is Ownable {
    uint256 public constant THRESHOLD_PERCENTAGE = 1000; // 10%
    uint256 public lastTVL;
    uint256 public lastCheckTime;
    bool public circuitBroken;
    
    event CircuitTripped(uint256 tvlDrop, uint256 timestamp);
    event CircuitReset(uint256 timestamp);
    
    constructor() Ownable(msg.sender) {
        lastCheckTime = block.timestamp;
    }
    
    function checkCircuit(uint256 currentTVL) internal {
        if (circuitBroken) revert("Circuit breaker active");
        
        if (lastTVL > 0 && block.timestamp > lastCheckTime + 1 hours) {
            uint256 drop = lastTVL > currentTVL ? lastTVL - currentTVL : 0;
            uint256 dropPercentage = (drop * 10000) / lastTVL;
            
            if (dropPercentage > THRESHOLD_PERCENTAGE) {
                circuitBroken = true;
                emit CircuitTripped(dropPercentage, block.timestamp);
            }
        }
        
        lastTVL = currentTVL;
        lastCheckTime = block.timestamp;
    }
    
    function resetCircuit() external onlyOwner {
        circuitBroken = false;
        emit CircuitReset(block.timestamp);
    }
}
