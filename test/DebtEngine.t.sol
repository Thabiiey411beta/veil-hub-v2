// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/core/DebtEngine.sol";
import "../src/tokens/VeilToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1000000 * 10**6);
    }
    
    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

contract DebtEngineTest is Test {
    DebtEngine public debtEngine;
    MockUSDC public usdc;
    VeilToken public veil;
    
    address public user = address(0x1);
    address public immortalReserve = address(0x2);
    address public veVeilGauge = address(0x3);
    address public treasury = address(0x4);
    
    function setUp() public {
        usdc = new MockUSDC();
        veil = new VeilToken();
        
        debtEngine = new DebtEngine(
            address(usdc),
            address(this),
            immortalReserve,
            veVeilGauge,
            treasury
        );
        
        // Setup collateral
        debtEngine.addCollateral(address(veil));
        debtEngine.updatePrice(address(veil), 1 * 10**8); // $1 per VEIL
        
        // Fund user
        veil.transfer(user, 1000 * 10**18);
        usdc.transfer(address(debtEngine), 1000000 * 10**6);
    }
    
    function testOpenPosition() public {
        vm.startPrank(user);
        
        uint256 collateralAmount = 1000 * 10**18; // 1000 VEIL
        uint256 borrowAmount = 500 * 10**6; // 500 USDC
        
        veil.approve(address(debtEngine), collateralAmount);
        debtEngine.openPosition(address(veil), collateralAmount, borrowAmount);
        
        (uint256 collateral, uint256 debt, , , bool active) = debtEngine.positions(user);
        
        assertEq(collateral, collateralAmount);
        assertEq(debt, borrowAmount);
        assertTrue(active);
        
        vm.stopPrank();
    }
    
    function testFailInsufficientCollateral() public {
        vm.startPrank(user);
        
        uint256 collateralAmount = 100 * 10**18; // 100 VEIL
        uint256 borrowAmount = 500 * 10**6; // 500 USDC (too much)
        
        veil.approve(address(debtEngine), collateralAmount);
        debtEngine.openPosition(address(veil), collateralAmount, borrowAmount);
        
        vm.stopPrank();
    }
    
    function testClosePosition() public {
        // Open position first
        testOpenPosition();
        
        vm.startPrank(user);
        
        uint256 totalDebt = debtEngine.calculateTotalDebt(user);
        usdc.approve(address(debtEngine), totalDebt);
        
        debtEngine.closePosition();
        
        (, , , , bool active) = debtEngine.positions(user);
        assertFalse(active);
        
        vm.stopPrank();
    }
    
    function testInterestAccrual() public {
        testOpenPosition();
        
        // Fast forward 1 year
        vm.warp(block.timestamp + 365 days);
        
        uint256 totalDebt = debtEngine.calculateTotalDebt(user);
        uint256 expectedInterest = (500 * 10**6 * 550) / 10000; // 5.5% of 500 USDC
        
        assertApproxEqAbs(totalDebt, 500 * 10**6 + expectedInterest, 1);
    }
}
