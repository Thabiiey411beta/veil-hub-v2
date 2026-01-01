// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/SupraOracle.sol";
import "../src/core/DebtEngine.sol";
import "../src/core/ImmortalReserve.sol";
import "../src/tokens/VeilToken.sol";

contract DeployScript is Script {
    // Supra L1 Testnet Oracle (from official docs)
    address constant SUPRA_ORACLE_TESTNET = 0x6bf7b21145Cbd7BB0b9916E6eB24EDA8A675D7C0;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy VEIL token
        VeilToken veil = new VeilToken();
        
        // Deploy Supra Oracle
        SupraOracle oracle = new SupraOracle(SUPRA_ORACLE_TESTNET);
        
        // Deploy ImmortalReserve
        ImmortalReserve reserve = new ImmortalReserve(address(veil));
        
        // Deploy DebtEngine
        DebtEngine debtEngine = new DebtEngine(
            address(veil),
            address(oracle),
            address(reserve)
        );
        
        vm.stopBroadcast();
        
        console.log("VEIL Token:", address(veil));
        console.log("Supra Oracle:", address(oracle));
        console.log("Immortal Reserve:", address(reserve));
        console.log("Debt Engine:", address(debtEngine));
    }
}
