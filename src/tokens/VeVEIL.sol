// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract VeVEIL is ERC20, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    IERC20 public immutable veil;
    uint256 public constant MIN_LOCK = 1 weeks;
    uint256 public constant MAX_LOCK = 4 * 365 days;
    uint256 public constant MAX_BOOST = 2.5e18;
    
    struct Lock {
        uint256 amount;
        uint256 end;
    }
    
    mapping(address => Lock) public locks;
    
    event Locked(address indexed user, uint256 amount, uint256 duration, uint256 veAmount);
    event Unlocked(address indexed user, uint256 amount);
    event BoostApplied(address indexed user, uint256 boost);
    
    constructor(address _veil) ERC20("Vote-Escrowed VEIL", "veVEIL") {
        veil = IERC20(_veil);
    }
    
    function lock(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Zero amount");
        require(duration >= MIN_LOCK && duration <= MAX_LOCK, "Invalid duration");
        require(locks[msg.sender].amount == 0, "Already locked");
        
        uint256 veAmount = (amount * duration) / MAX_LOCK;
        locks[msg.sender] = Lock(amount, block.timestamp + duration);
        
        veil.safeTransferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, veAmount);
        
        emit Locked(msg.sender, amount, duration, veAmount);
    }
    
    function unlock() external nonReentrant {
        Lock memory userLock = locks[msg.sender];
        require(userLock.amount > 0, "No lock");
        require(block.timestamp >= userLock.end, "Lock not expired");
        
        uint256 veBalance = balanceOf(msg.sender);
        _burn(msg.sender, veBalance);
        veil.safeTransfer(msg.sender, userLock.amount);
        delete locks[msg.sender];
        
        emit Unlocked(msg.sender, userLock.amount);
    }
    
    function getBoost(address user) external view returns (uint256) {
        uint256 veBalance = balanceOf(user);
        if (veBalance == 0) return 1e18;
        
        uint256 veilBalance = veil.balanceOf(user);
        if (veilBalance == 0) return MAX_BOOST;
        
        uint256 boost = (veBalance * MAX_BOOST) / veilBalance;
        return boost > MAX_BOOST ? MAX_BOOST : boost;
    }
}
