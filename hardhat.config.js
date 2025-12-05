require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    supra: {
      url: 'https://rpc-mainnet.supra.com',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
    },
    supraDev: {
      url: 'https://rpc-testnet.supra.com',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 2,
    },
  },
  etherscan: {
    apiKey: {
      supra: process.env.SUPRA_API_KEY || 'dummy',
    },
    customChains: [
      {
        network: 'supra',
        chainId: 1,
        urls: {
          apiURL: 'https://suprascan.io/api',
          browserURL: 'https://suprascan.io',
        },
      },
    ],
  },
};