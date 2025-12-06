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

contract SupraVRF {
    ISupraRouter public supraRouter;
    uint256 public nonce;
    uint256 public lastRandom;
    
    event RandomnessRequested(uint256 indexed nonce);
    event RandomnessReceived(uint256 indexed nonce, uint256 randomness);
    
    constructor(address _router) {
        supraRouter = ISupraRouter(_router);
    }
    
    /// Request random number from Supra dVRF
    function requestRandomness(uint8 numConfirmations) external returns (uint256) {
        nonce++;
        uint256 requestId = supraRouter.generateRequest(
            "callback(uint256,uint256[])",
            1, // rngCount
            numConfirmations,
            nonce,
            address(this)
        );
        
        emit RandomnessRequested(nonce);
        return requestId;
    }
    
    /// Callback from Supra dVRF network
    function callback(uint256 _nonce, uint256[] memory _rngList) external {
        require(msg.sender == address(supraRouter), "Only router");
        require(_rngList.length > 0, "Empty randomness");
        
        lastRandom = _rngList[0];
        emit RandomnessReceived(_nonce, lastRandom);
    }
    
    /// Get random vault strategy (0-2)
    function getRandomStrategy() external view returns (uint8) {
        return uint8(lastRandom % 3);
    }
}
