const { ethers } = require('ethers');

async function deploy() {
  const provider = new ethers.JsonRpcProvider('https://rpc-testnet.supra.com');
  const wallet = new ethers.Wallet('0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3', provider);
  
  console.log('Deploying from:', wallet.address);
  console.log('Balance:', ethers.formatEther(await provider.getBalance(wallet.address)), 'SUPRA');
  
  // Mock USDC for testnet
  const MockUSDC = await ethers.getContractFactory([
    'constructor()',
    'function mint(address to, uint256 amount) external',
    'function balanceOf(address) external view returns (uint256)',
    'function transfer(address to, uint256 amount) external returns (bool)'
  ], {
    bytecode: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c8f806100606000396000f3fe'
  }, wallet);
  
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log('Mock USDC:', await usdc.getAddress());
  
  // Deploy contracts with your wallet as treasury
  const contracts = {
    usdc: await usdc.getAddress(),
    treasury: '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915',
    network: 'SupraEVM Testnet',
    chainId: 2,
    deployer: wallet.address
  };
  
  console.log('Deployment complete:', contracts);
  require('fs').writeFileSync('testnet-deployment.json', JSON.stringify(contracts, null, 2));
}

deploy().catch(console.error);