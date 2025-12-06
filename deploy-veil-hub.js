const { SupraClient, SupraAccount, BCS, TxnBuilderTypes } = require('supra-l1-sdk');
const fs = require('fs');

const PRIVATE_KEY = '1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function deploy() {
    console.log('🚀 Veil Hub v14 - Testnet Deployment\n');
    
    const client = await SupraClient.init(RPC_URL);
    const account = new SupraAccount(Buffer.from(PRIVATE_KEY, 'hex'));
    
    console.log('Deployer:', account.address().toString());
    console.log('Chain ID:', client.chainId.value);
    
    const balance = await client.getAccountSupraCoinBalance(account.address());
    console.log('Balance:', Number(balance) / 1e18, 'SUPRA\n');
    
    if (balance < BigInt(1e17)) {
        console.log('❌ Insufficient balance');
        console.log('Get funds: https://rpc-testnet.supra.com/rpc/v1/wallet/faucet/' + account.address().toString());
        return;
    }
    
    const accountInfo = await client.getAccountInfo(account.address());
    console.log('Sequence:', accountInfo.sequence_number, '\n');
    
    // Test transfer
    console.log('📤 Testing SUPRA transfer...');
    
    try {
        const transferTx = await client.transferSupraCoin(
            account,
            account.address(),
            BigInt(100),
            {
                optionalTransactionPayloadArgs: {
                    maxGas: BigInt(10),
                    gasUnitPrice: BigInt(100)
                },
                enableTransactionWaitAndSimulationArgs: {
                    enableWaitForTransaction: true,
                    enableTransactionSimulation: false
                }
            }
        );
        
        console.log('✅ TX Hash:', transferTx.txHash);
        console.log('Status:', transferTx.result);
    } catch (error) {
        console.log('⚠️  Transfer failed:', error.message);
    }
    
    // Save deployment
    const deployment = {
        deployer: account.address().toString(),
        chainId: client.chainId.value,
        rpc: RPC_URL,
        balance: Number(balance) / 1e18,
        sequenceNumber: accountInfo.sequence_number.toString(),
        timestamp: new Date().toISOString(),
        contracts: {
            veilToken: 'pending',
            immortalReserve: 'pending',
            debtEngine: 'pending',
            veilHub: 'pending'
        }
    };
    
    fs.writeFileSync('veil-deployment.json', JSON.stringify(deployment, null, 2));
    
    console.log('\n✅ Deployment info saved to veil-deployment.json');
    console.log('\n📦 Next: Compile and deploy Move modules');
    console.log('   supra move compile');
    console.log('   supra move publish --profile default');
}

deploy().catch(console.error);
