// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ISupraOraclePull {
    struct PriceInfo {
        uint256[] pairs;
        uint256[] prices;
        uint256[] timestamp;
        uint256[] decimal;
        uint256[] round;
    }
    
    function verifyOracleProofV2(bytes calldata _bytesProof) external returns (PriceInfo memory);
}

/**
 * @title SupraOracle
 * @dev Supra DORA oracle integration for Veil Hub price feeds
 */
contract SupraOracle is Ownable {
    ISupraOraclePull public oracle;
    
    // Pair indexes for Veil Hub assets
    uint256 public constant ETH_USD = 0;
    uint256 public constant BTC_USD = 1;
    uint256 public constant USDC_USD = 49;
    
    event PriceUpdated(uint256 indexed pair, uint256 price, uint256 timestamp);
    event OracleAddressUpdated(address indexed newOracle);
    
    constructor(address _oracle) Ownable(msg.sender) {
        oracle = ISupraOraclePull(_oracle);
    }
    
    /**
     * @dev Get price for a specific pair with timestamp and round
     * @param _bytesProof Oracle proof from Supra DORA
     * @param pair Asset pair index
     */
    function getPairPrice(bytes calldata _bytesProof, uint256 pair) 
        external 
        returns (uint256 price, uint256 timestamp, uint256 round) 
    {
        ISupraOraclePull.PriceInfo memory prices = oracle.verifyOracleProofV2(_bytesProof);
        
        for (uint256 i = 0; i < prices.pairs.length; i++) {
            if (prices.pairs[i] == pair) {
                price = prices.prices[i];
                timestamp = prices.timestamp[i];
                round = prices.round[i];
                
                require(price != 0, "Pair not found");
                emit PriceUpdated(pair, price, timestamp);
                
                return (price, timestamp, round);
            }
        }
        
        revert("Pair not found in proof");
    }
    
    /**
     * @dev Update Supra oracle address (future-proofing)
     */
    function updateOracleAddress(address _newOracle) external onlyOwner {
        require(_newOracle != address(0), "Invalid oracle address");
        oracle = ISupraOraclePull(_newOracle);
        emit OracleAddressUpdated(_newOracle);
    }
    
    /**
     * @dev Get collateral value in USD using Supra oracle
     */
    function getCollateralValue(
        bytes calldata _bytesProof,
        uint256 pairIndex,
        uint256 amount
    ) external returns (uint256) {
        (uint256 price, , ) = this.getPairPrice(_bytesProof, pairIndex);
        return (amount * price) / 10**18;
    }
}