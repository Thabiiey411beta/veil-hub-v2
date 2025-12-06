const { SupraClient, SupraAccount } = require('supra-l1-sdk');
const fs = require('fs');

const PRIVATE_KEY = '1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';
const CHAIN_ID = 6;

async function deploy() {
    console.log('🚀 Veil Hub v14 - Supra Testnet Deployment\n');
    
    const client = await SupraClient.init(RPC_URL);
    const pkBytes = Buffer.from(PRIVATE_KEY, 'hex');
    const account = new SupraAccount(pkBytes);
    
    const address = account.address().toString();
    console.log('Deployer:', address);
    
    const balance = await client.getAccountSupraCoinBalance(address);
    const balanceNum = Number(balance) / 1e18;
    console.log('Balance:', balanceNum, 'SUPRA\n');
    
    if (balance === 0n) {
        console.log('❌ No balance. Run: curl -X GET "https://rpc-testnet.supra.com/rpc/v1/wallet/faucet/' + address + '"');
        return;
    }
    
    const deployment = {
        deployer: address,
        network: 'supra-testnet',
        chainId: CHAIN_ID,
        rpc: RPC_URL,
        balance: balanceNum,
        timestamp: new Date().toISOString(),
        status: 'funded',
        contracts: {
            note: 'Deploy Solidity contracts using Foundry or Hardhat',
            veilToken: 'pending',
            mockUSDC: 'pending',
            immortalReserve: 'pending',
            debtEngine: 'pending',
            vaultFactory: 'pending',
            supraOracle: 'pending',
            veilVRF: 'pending',
            veilHub: 'pending'
        }
    };
    
    fs.writeFileSync('deployment-status.json', JSON.stringify(deployment, null, 2));
    console.log('✅ Account funded and ready!');
    console.log('📄 Status saved to deployment-status.json\n');
    console.log('📦 Next: Deploy contracts using Foundry');
    console.log('   forge script script/DeployAll.s.sol --rpc-url ' + RPC_URL + ' --broadcast');
}

deploy().catch(console.error);
