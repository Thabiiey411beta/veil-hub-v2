// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IImmortalReserve {
    function burnVeilForImmortalShares(uint256 veilAmount) external;
    function receiveRevenue(uint256 amount) external;
    function pendingDividends(address user) external view returns (uint256);
    function claimDividends() external;
}
