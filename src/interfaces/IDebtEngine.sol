// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IDebtEngine {
    function openPosition(address collateralAsset, uint256 collateralAmount, uint256 borrowAmount) external;
    function closePosition() external;
    function calculateTotalDebt(address user) external view returns (uint256);
    function isPositionAtRisk(address user) external view returns (bool);
}
