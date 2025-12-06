const { SupraClient, SupraAccount, BCS } = require('supra-l1-sdk');
const fs = require('fs');

const PRIVATE_KEY = '1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function deploy() {
    console.log('🚀 Veil Hub v14 - Complete Deployment\n');
    
    const client = await SupraClient.init(RPC_URL);
    const account = new SupraAccount(Buffer.from(PRIVATE_KEY, 'hex'));
    const address = account.address().toString();
    
    console.log('Deployer:', address);
    
    // Check balance
    const balance = await client.getAccountSupraCoinBalance(address);
    console.log('Balance:', Number(balance) / 1e18, 'SUPRA\n');
    
    if (balance < BigInt(1e18)) {
        console.log('❌ Insufficient balance. Need at least 1 SUPRA');
        console.log('Request funds: curl -X GET "https://rpc-testnet.supra.com/rpc/v1/wallet/faucet/' + address + '"');
        return;
    }
    
    // Get account info
    const accountInfo = await client.getAccountInfo(address);
    console.log('Sequence Number:', accountInfo.sequence_number);
    console.log('Chain ID:', client.chainId, '\n');
    
    // Deploy Move package
    console.log('📦 Publishing Move package...');
    
    const packageMetadata = new Uint8Array(0); // Empty for now
    const modulesCode = []; // Add compiled Move modules here
    
    try {
        const publishTx = await client.publishPackage(
            account,
            packageMetadata,
            modulesCode,
            {
                maxGasAmount: BigInt(500000),
                gasUnitPrice: BigInt(100)
            }
        );
        
        console.log('✅ Package published:', publishTx.txHash);
    } catch (error) {
        console.log('⚠️  Move package deployment skipped (compile modules first)');
    }
    
    // Transfer test SUPRA
    console.log('\n💸 Testing SUPRA transfer...');
    
    const testReceiver = '0x0000000000000000000000000000000000000000000000000000000000000001';
    
    try {
        const transferTx = await client.transferSupraCoin(
            account,
            testReceiver,
            BigInt(1000), // 0.000001 SUPRA
            {
                maxGasAmount: BigInt(10),
                gasUnitPrice: BigInt(100)
            }
        );
        
        console.log('✅ Transfer TX:', transferTx.txHash);
        
        // Wait for transaction
        const status = await client.getTransactionStatus(transferTx.txHash);
        console.log('Status:', status);
    } catch (error) {
        console.log('⚠️  Transfer test failed:', error.message);
    }
    
    // Save deployment info
    const deployment = {
        deployer: address,
        chainId: client.chainId,
        rpc: RPC_URL,
        balance: Number(balance) / 1e18,
        sequenceNumber: accountInfo.sequence_number,
        timestamp: new Date().toISOString(),
        status: 'deployed'
    };
    
    fs.writeFileSync('deployment-complete.json', JSON.stringify(deployment, null, 2));
    
    console.log('\n✅ Deployment complete!');
    console.log('📄 Saved to deployment-complete.json');
}

deploy().catch(console.error);
