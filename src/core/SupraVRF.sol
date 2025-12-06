// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ISupraRouter {
    function generateRequest(
        string memory _functionSig,
        uint8 _rngCount,
        uint256 _numConfirmations,
        uint256 _clientSeed,
        address _clientWalletAddress
    ) external returns (uint256);
}

interface IDepositContract {
    function depositFundClient() external payable;
    function checkClientFund(address _clientAddress) external view returns (uint128);
    function checkMinBalanceClient(address _clientAddress) external view returns (uint128);
    function isMinimumBalanceReached(address _clientAddress) external view returns (bool);
}

contract VeilVRF {
    ISupraRouter public supraRouter;
    IDepositContract public depositContract;
    address public clientWallet;
    uint256 public nonce;
    uint256 public lastRandom;
    
    event RandomnessRequested(uint256 indexed nonce);
    event RandomnessReceived(uint256 indexed nonce, uint256 randomness);
    event FundsDeposited(uint256 amount);
    
    constructor(address _router, address _deposit, address _clientWallet) {
        supraRouter = ISupraRouter(_router);
        depositContract = IDepositContract(_deposit);
        clientWallet = _clientWallet;
    }
    
    /// Deposit funds for VRF callbacks
    function depositFunds() external payable {
        depositContract.depositFundClient{value: msg.value}();
        emit FundsDeposited(msg.value);
    }
    
    /// Request random number
    function requestVaultRandomness(uint8 numConfirmations) external returns (uint256) {
        require(!depositContract.isMinimumBalanceReached(clientWallet), "Insufficient balance");
        
        nonce++;
        uint256 requestId = supraRouter.generateRequest(
            "vaultCallback(uint256,uint256[])",
            1,
            numConfirmations,
            nonce,
            clientWallet
        );
        
        emit RandomnessRequested(nonce);
        return requestId;
    }
    
    /// Callback from Supra dVRF
    function vaultCallback(uint256 _nonce, uint256[] memory _rngList) external {
        require(msg.sender == address(supraRouter), "Only router");
        require(_rngList.length > 0, "Empty randomness");
        
        lastRandom = _rngList[0];
        emit RandomnessReceived(_nonce, lastRandom);
    }
    
    /// Get random strategy (0-2)
    function getRandomStrategy() external view returns (uint8) {
        return uint8(lastRandom % 3);
    }
    
    /// Check subscription balance
    function getBalance() external view returns (uint128) {
        return depositContract.checkClientFund(clientWallet);
    }
    
    /// Check minimum balance required
    function getMinBalance() external view returns (uint128) {
        return depositContract.checkMinBalanceClient(clientWallet);
    }
}
