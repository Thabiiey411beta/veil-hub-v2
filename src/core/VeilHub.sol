// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "../interfaces/IDebtEngine.sol";
import "../interfaces/IImmortalReserve.sol";
import "../security/CircuitBreaker.sol";

contract VeilHub is Ownable, ReentrancyGuard, Pausable, CircuitBreaker {
    IDebtEngine public debtEngine;
    IImmortalReserve public immortalReserve;
    address public vaultFactory;
    address public supraOracle;
    address public supraVRF;
    
    uint256 public totalValueLocked;
    uint256 public protocolRevenue;
    
    event ProtocolInitialized(address indexed debtEngine, address indexed immortalReserve);
    event TVLUpdated(uint256 newTVL, uint256 timestamp);
    event RevenueCollected(uint256 amount, address indexed source);
    
    constructor() Ownable(msg.sender) {}
    
    function initialize(
        address _debtEngine,
        address _immortalReserve,
        address _vaultFactory,
        address _supraOracle,
        address _supraVRF
    ) external onlyOwner {
        require(_debtEngine != address(0), "Invalid debt engine");
        require(_immortalReserve != address(0), "Invalid reserve");
        
        debtEngine = IDebtEngine(_debtEngine);
        immortalReserve = IImmortalReserve(_immortalReserve);
        vaultFactory = _vaultFactory;
        supraOracle = _supraOracle;
        supraVRF = _supraVRF;
        
        emit ProtocolInitialized(_debtEngine, _immortalReserve);
    }
    
    function updateTVL(uint256 newTVL) external onlyOwner {
        checkCircuit(newTVL);
        totalValueLocked = newTVL;
        emit TVLUpdated(newTVL, block.timestamp);
    }
    
    function collectRevenue(uint256 amount, address source) external nonReentrant {
        require(msg.sender == address(debtEngine) || msg.sender == vaultFactory, "Unauthorized");
        protocolRevenue += amount;
        emit RevenueCollected(amount, source);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function getProtocolStats() external view returns (
        uint256 tvl,
        uint256 revenue,
        bool paused,
        bool circuitActive
    ) {
        return (totalValueLocked, protocolRevenue, paused(), circuitBroken);
    }
}
