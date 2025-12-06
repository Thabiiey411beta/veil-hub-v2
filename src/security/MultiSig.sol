// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MultiSig {
    address[] public owners;
    uint256 public required;
    
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    uint256 public transactionCount;
    
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmationCount;
    }
    
    event Submission(uint256 indexed txId);
    event Confirmation(address indexed owner, uint256 indexed txId);
    event Execution(uint256 indexed txId);
    
    modifier onlyOwner() {
        bool isOwner;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) isOwner = true;
        }
        require(isOwner, "Not owner");
        _;
    }
    
    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length >= _required && _required > 0, "Invalid");
        owners = _owners;
        required = _required;
    }
    
    function submitTransaction(address to, uint256 value, bytes memory data) external onlyOwner returns (uint256) {
        uint256 txId = transactionCount++;
        transactions[txId] = Transaction(to, value, data, false, 0);
        emit Submission(txId);
        confirmTransaction(txId);
        return txId;
    }
    
    function confirmTransaction(uint256 txId) public onlyOwner {
        require(!confirmations[txId][msg.sender], "Already confirmed");
        confirmations[txId][msg.sender] = true;
        transactions[txId].confirmationCount++;
        emit Confirmation(msg.sender, txId);
        
        if (transactions[txId].confirmationCount >= required) {
            executeTransaction(txId);
        }
    }
    
    function executeTransaction(uint256 txId) internal {
        Transaction storage txn = transactions[txId];
        require(!txn.executed, "Already executed");
        txn.executed = true;
        (bool success,) = txn.to.call{value: txn.value}(txn.data);
        require(success, "Execution failed");
        emit Execution(txId);
    }
}
