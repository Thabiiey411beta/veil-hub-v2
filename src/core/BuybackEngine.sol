// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IVeilToken {
    function burn(uint256 amount) external;
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory);
}

contract BuybackEngine is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    IERC20 public immutable usdc;
    IVeilToken public immutable veil;
    IUniswapV2Router public router;
    
    uint256 public totalBuyback;
    uint256 public totalBurned;
    uint256 public minBuybackAmount = 1000 * 10**6; // 1000 USDC
    
    event Buyback(uint256 usdcAmount, uint256 veilAmount, uint256 timestamp);
    event Burned(uint256 amount);
    
    constructor(address _usdc, address _veil, address _router) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        veil = IVeilToken(_veil);
        router = IUniswapV2Router(_router);
    }
    
    function executeBuyback(uint256 usdcAmount) external onlyOwner nonReentrant {
        require(usdcAmount >= minBuybackAmount, "Below minimum");
        require(usdc.balanceOf(address(this)) >= usdcAmount, "Insufficient USDC");
        
        address[] memory path = new address[](2);
        path[0] = address(usdc);
        path[1] = address(veil);
        
        usdc.approve(address(router), usdcAmount);
        
        uint256[] memory amounts = router.swapExactTokensForTokens(
            usdcAmount,
            0,
            path,
            address(this),
            block.timestamp + 300
        );
        
        uint256 veilBought = amounts[1];
        totalBuyback += usdcAmount;
        
        emit Buyback(usdcAmount, veilBought, block.timestamp);
        
        veil.burn(veilBought);
        totalBurned += veilBought;
        
        emit Burned(veilBought);
    }
    
    function receiveRevenue(uint256 amount) external {
        usdc.safeTransferFrom(msg.sender, address(this), amount);
    }
    
    function setMinBuyback(uint256 amount) external onlyOwner {
        minBuybackAmount = amount;
    }
    
    function setRouter(address _router) external onlyOwner {
        router = IUniswapV2Router(_router);
    }
}
