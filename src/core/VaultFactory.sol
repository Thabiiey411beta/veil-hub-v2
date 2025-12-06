// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Vault Factory
 * @dev Factory contract for creating and managing ERC-4626 vaults
 */
contract VaultFactory is Ownable, ReentrancyGuard {
    struct VaultInfo {
        address vault;
        address asset;
        string strategy;
        uint256 performanceFee; // basis points (100 = 1%)
        uint256 tvl;
        uint256 apy; // basis points (1000 = 10%)
        bool active;
    }
    
    mapping(address => VaultInfo) public vaults;
    address[] public vaultList;
    
    uint256 public constant MAX_PERFORMANCE_FEE = 1000; // 10%
    uint256 public constant WHALE_THRESHOLD = 5_000_000 * 10**6; // $5M USDC
    
    address public immutable veilToken;
    address public immutable immortalReserve;
    address public treasury;
    
    event VaultCreated(
        address indexed vault,
        address indexed asset,
        string strategy,
        uint256 performanceFee
    );
    
    event VaultUpdated(address indexed vault, uint256 newApy, uint256 newTvl);
    event WhaleStatusGranted(address indexed user, uint256 totalTvl);
    
    constructor(
        address _veilToken,
        address _immortalReserve,
        address _treasury
    ) Ownable(msg.sender) {
        veilToken = _veilToken;
        immortalReserve = _immortalReserve;
        treasury = _treasury;
    }
    
    /**
     * @dev Create a new vault
     */
    function createVault(
        address asset,
        string memory strategy,
        uint256 performanceFee,
        uint256 initialApy
    ) external onlyOwner returns (address vault) {
        require(performanceFee <= MAX_PERFORMANCE_FEE, "Fee too high");
        
        // Deploy vault (simplified - would use actual vault implementation)
        vault = address(new MockVault(asset, strategy));
        
        vaults[vault] = VaultInfo({
            vault: vault,
            asset: asset,
            strategy: strategy,
            performanceFee: performanceFee,
            tvl: 0,
            apy: initialApy,
            active: true
        });
        
        vaultList.push(vault);
        
        emit VaultCreated(vault, asset, strategy, performanceFee);
    }
    
    /**
     * @dev Update vault metrics
     */
    function updateVault(
        address vault,
        uint256 newApy,
        uint256 newTvl
    ) external onlyOwner {
        require(vaults[vault].active, "Vault not active");
        
        vaults[vault].apy = newApy;
        vaults[vault].tvl = newTvl;
        
        emit VaultUpdated(vault, newApy, newTvl);
    }
    
    /**
     * @dev Check if user qualifies for whale mode
     */
    function isWhale(address user) external view returns (bool) {
        uint256 totalTvl = getUserTotalTvl(user);
        return totalTvl >= WHALE_THRESHOLD;
    }
    
    /**
     * @dev Get user's total TVL across all vaults
     */
    function getUserTotalTvl(address user) public view returns (uint256 totalTvl) {
        for (uint256 i = 0; i < vaultList.length; i++) {
            address vault = vaultList[i];
            if (vaults[vault].active) {
                // Simplified - would call actual vault balance
                totalTvl += MockVault(vault).balanceOf(user);
            }
        }
    }
    
    /**
     * @dev Get all active vaults
     */
    function getActiveVaults() external view returns (address[] memory activeVaults) {
        uint256 count = 0;
        for (uint256 i = 0; i < vaultList.length; i++) {
            if (vaults[vaultList[i]].active) {
                count++;
            }
        }
        
        activeVaults = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < vaultList.length; i++) {
            if (vaults[vaultList[i]].active) {
                activeVaults[index] = vaultList[i];
                index++;
            }
        }
    }
}

/**
 * @dev Mock vault for demonstration
 */
contract MockVault {
    address public asset;
    string public strategy;
    mapping(address => uint256) public balanceOf;
    
    constructor(address _asset, string memory _strategy) {
        asset = _asset;
        strategy = _strategy;
    }
}