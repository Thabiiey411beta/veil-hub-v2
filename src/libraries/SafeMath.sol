// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library VeilMath {
    function calculateInterest(uint256 principal, uint256 rate, uint256 time) internal pure returns (uint256) {
        return (principal * rate * time) / (10000 * 365 days);
    }
    
    function calculateCollateralRatio(uint256 collateralValue, uint256 debtValue) internal pure returns (uint256) {
        require(debtValue > 0, "Debt cannot be zero");
        return (collateralValue * 10000) / debtValue;
    }
}
