// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/core/VeilHub.sol";
import "../src/core/DebtEngine.sol";
import "../src/core/ImmortalReserve.sol";
import "../src/core/VaultFactory.sol";
import "../src/core/SupraOracle.sol";
import "../src/core/SupraVRF.sol";
import "../src/core/AccessControl.sol";
import "../src/core/VeilVault.sol";
import "../src/tokens/VeilToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 10_000_000 * 10**6);
    }
    function decimals() public pure override returns (uint8) { return 6; }
}

contract DeployAll is Script {
    address constant SUPRA_ORACLE = 0x6bf7b21145Cbd7BB0b9916E6eB24EDA8A675D7C0;
    address constant SUPRA_VRF_ROUTER = 0x9E6d14C1d5a8Dd8FbF1c8c8e8e8e8e8e8e8e8e8e;
    address constant SUPRA_DEPOSIT = 0x8E6d14C1d5a8Dd8FbF1c8c8e8e8e8e8e8e8e8e8e;
    
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);
        
        vm.startBroadcast(pk);
        
        // 1. Deploy tokens
        VeilToken veil = new VeilToken();
        MockUSDC usdc = new MockUSDC();
        
        // 2. Deploy access control
        VeilAccessControl accessControl = new VeilAccessControl();
        
        // 3. Deploy ImmortalReserve
        ImmortalReserve reserve = new ImmortalReserve(address(usdc), address(veil));
        
        // 4. Deploy oracles
        SupraOracle oracle = new SupraOracle(SUPRA_ORACLE);
        VeilVRF vrf = new VeilVRF(SUPRA_VRF_ROUTER, SUPRA_DEPOSIT, deployer);
        
        // 5. Deploy DebtEngine
        DebtEngine debtEngine = new DebtEngine(
            address(usdc),
            address(this),
            address(reserve),
            address(this),
            deployer
        );
        
        // 6. Deploy VaultFactory
        VaultFactory factory = new VaultFactory(
            address(veil),
            address(reserve),
            deployer
        );
        
        // 7. Deploy VeilHub
        VeilHub hub = new VeilHub();
        hub.initialize(
            address(debtEngine),
            address(reserve),
            address(factory),
            address(oracle),
            address(vrf)
        );
        
        // 8. Setup collateral
        debtEngine.addCollateral(address(veil));
        debtEngine.updatePrice(address(veil), 1 * 10**8);
        
        // 9. Fund addresses
        veil.transfer(deployer, 100_000 * 10**18);
        usdc.transfer(address(debtEngine), 1_000_000 * 10**6);
        usdc.transfer(address(reserve), 500_000 * 10**6);
        
        // 10. Fund VRF
        vrf.depositFunds{value: 1 ether}();
        
        vm.stopBroadcast();
        
        console.log("=== DEPLOYMENT COMPLETE ===");
        console.log("VeilToken:", address(veil));
        console.log("MockUSDC:", address(usdc));
        console.log("AccessControl:", address(accessControl));
        console.log("ImmortalReserve:", address(reserve));
        console.log("SupraOracle:", address(oracle));
        console.log("VeilVRF:", address(vrf));
        console.log("DebtEngine:", address(debtEngine));
        console.log("VaultFactory:", address(factory));
        console.log("VeilHub:", address(hub));
        console.log("Deployer:", deployer);
    }
}
