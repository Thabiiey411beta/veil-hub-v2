const { ethers } = require('ethers');
const fs = require('fs');

// SupraEVM deployment script
async function deploy() {
  const provider = new ethers.JsonRpcProvider('https://rpc-testnet.supra.com');
  
  // Your wallet private key (use environment variable in production)
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log('Deploying from:', wallet.address);
  console.log('Target wallet:', '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915');
  
  // Deploy VEIL Token
  const VeilToken = await ethers.getContractFactory('VeilToken', wallet);
  const veilToken = await VeilToken.deploy();
  await veilToken.waitForDeployment();
  console.log('VEIL Token deployed to:', await veilToken.getAddress());
  
  // Deploy Immortal Reserve
  const ImmortalReserve = await ethers.getContractFactory('ImmortalReserve', wallet);
  const immortalReserve = await ImmortalReserve.deploy(
    '0x...', // USDC address on SupraEVM
    await veilToken.getAddress()
  );
  await immortalReserve.waitForDeployment();
  console.log('Immortal Reserve deployed to:', await immortalReserve.getAddress());
  
  // Deploy Vault Factory
  const VaultFactory = await ethers.getContractFactory('VaultFactory', wallet);
  const vaultFactory = await VaultFactory.deploy(
    await veilToken.getAddress(),
    await immortalReserve.getAddress(),
    '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915' // Your treasury
  );
  await vaultFactory.waitForDeployment();
  console.log('Vault Factory deployed to:', await vaultFactory.getAddress());
  
  // Deploy Debt Engine
  const DebtEngine = await ethers.getContractFactory('DebtEngine', wallet);
  const debtEngine = await DebtEngine.deploy(
    '0x...', // USDC address
    '0x...', // Stability Pool
    await immortalReserve.getAddress(),
    '0x...', // veVEIL Gauge
    '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915'
  );
  await debtEngine.waitForDeployment();
  console.log('Debt Engine deployed to:', await debtEngine.getAddress());
  
  // Save deployment addresses
  const deployment = {
    veilToken: await veilToken.getAddress(),
    immortalReserve: await immortalReserve.getAddress(),
    vaultFactory: await vaultFactory.getAddress(),
    debtEngine: await debtEngine.getAddress(),
    network: 'SupraEVM Testnet',
    chainId: 2,
    deployer: wallet.address,
    treasury: '0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915'
  };
  
  fs.writeFileSync('deployment.json', JSON.stringify(deployment, null, 2));
  console.log('Deployment complete! Addresses saved to deployment.json');
}

deploy().catch(console.error);