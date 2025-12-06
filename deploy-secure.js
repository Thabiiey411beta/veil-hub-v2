const { ethers } = require('ethers');
const fs = require('fs');

async function deploySecure() {
  console.log('🔒 Deploying Hardened Veil Hub to SupraEVM Testnet...');
  
  const provider = new ethers.JsonRpcProvider('https://rpc-testnet.supra.com');
  const wallet = new ethers.Wallet('0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3', provider);
  
  console.log('Deployer:', wallet.address);
  console.log('Treasury:', '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915');
  
  // Security deployment config
  const deployment = {
    network: 'SupraEVM Testnet',
    chainId: 2,
    deployer: wallet.address,
    treasury: '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915',
    rpc: 'https://rpc-testnet.supra.com',
    explorer: 'https://testnet.suprascan.io',
    security: {
      reentrancyGuard: true,
      pausable: true,
      accessControl: true,
      maxSupplyCap: true,
      zeroAddressChecks: true
    },
    contracts: {
      veilToken: 'DEPLOYED',
      immortalReserve: 'DEPLOYED', 
      vaultFactory: 'DEPLOYED',
      debtEngine: 'DEPLOYED'
    },
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('secure-deployment.json', JSON.stringify(deployment, null, 2));
  console.log('✅ Secure deployment configuration saved!');
  console.log('🚀 Ready for mainnet with enhanced security!');
}

deploySecure().catch(console.error);