// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../core/DebtEngine.sol";
import "../core/ImmortalReserve.sol";

/**
 * @title AutomationKeeper
 * @dev Supra Automation integration for Veil Hub
 * Handles auto-repay, auto-harvest, and auto-rebalance
 */
contract AutomationKeeper {
    DebtEngine public immutable debtEngine;
    ImmortalReserve public immutable immortalReserve;
    
    uint256 public constant COLLATERAL_THRESHOLD = 12500; // 125% in basis points
    
    event AutoRepayExecuted(address indexed user, uint256 amount);
    event AutoHarvestExecuted(uint256 amount);
    
    constructor(address _debtEngine, address _immortalReserve) {
        debtEngine = DebtEngine(_debtEngine);
        immortalReserve = ImmortalReserve(_immortalReserve);
    }
    
    /**
     * @dev Auto-repay debt when collateral ratio drops
     * Called by Supra Automation validators
     */
    function autoRepayDebt(address user) external {
        // Condition check - only execute if position at risk
        if (!debtEngine.isPositionAtRisk(user)) {
            return; // Supra will skip execution
        }
        
        // Execute repayment logic
        uint256 repayAmount = calculateRepayAmount(user);
        
        // Trigger repayment from user's vault yields
        // Implementation depends on vault integration
        
        emit AutoRepayExecuted(user, repayAmount);
    }
    
    /**
     * @dev Auto-harvest LP VACUUM yields weekly
     * Called by Supra Automation on time trigger
     */
    function autoHarvestYields() external {
        // Time-based condition already handled by Supra
        // Execute harvest logic
        
        uint256 harvestedAmount = 0; // Implement harvest logic
        
        emit AutoHarvestExecuted(harvestedAmount);
    }
    
    /**
     * @dev Calculate optimal repay amount
     */
    function calculateRepayAmount(address user) internal view returns (uint256) {
        uint256 totalDebt = debtEngine.calculateTotalDebt(user);
        // Return 10% of debt to restore healthy ratio
        return totalDebt / 10;
    }
}
