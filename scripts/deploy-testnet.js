console.log('🚀 Deploying to SupraEVM Testnet...');
console.log('Treasury:', '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915');
console.log('Private Key:', '0x1c8d...8dd3');
console.log('✅ Testnet deployment simulated successfully!');

const deployment = {
  network: 'SupraEVM Testnet',
  chainId: 2,
  treasury: '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915',
  rpc: 'https://rpc-testnet.supra.com',
  explorer: 'https://testnet.suprascan.io'
};

require('fs').writeFileSync('testnet-deployment.json', JSON.stringify(deployment, null, 2));
console.log('📄 Deployment config saved to testnet-deployment.json');