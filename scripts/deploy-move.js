#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS } = require('supra-l1-sdk');
const fs = require('fs');
const path = require('path');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function deployMove() {
  console.log('🚀 Deploying Veil Hub Move Modules\n');

  const client = await SupraClient.init(RPC_URL);
  const account = client.createAccount(HexString.ensure(DEPLOYER_KEY));
  const address = account.address().hex();

  console.log('📍 Deployer:', address);

  const balance = await client.getAccountSupraCoinBalance(address);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  // Read compiled Move bytecode
  const modulePath = path.join(__dirname, '../move/build/VeilHub/bytecode_modules/veil_token.mv');
  
  if (!fs.existsSync(modulePath)) {
    console.log('❌ Module not compiled. Run: supra move compile --package-dir move/');
    process.exit(1);
  }

  const bytecode = fs.readFileSync(modulePath);
  console.log('📦 Module size:', bytecode.length, 'bytes\n');

  // Deploy module
  console.log('⏳ Publishing veil_token module...');
  
  const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
    TxnBuilderTypes.EntryFunction.natural(
      "0x1::code",
      "publish_package_txn",
      [],
      [BCS.bcsSerializeBytes(bytecode), BCS.bcsSerializeBytes(Buffer.from([]))]
    )
  );

  try {
    const txHash = await client.sendTxUsingSerializedRawTransaction(
      account,
      payload
    );
    
    console.log('✅ Transaction:', txHash);
    console.log('🔗 Explorer:', `https://testnet.suprascan.io/tx/${txHash}\n`);

    // Save deployment
    const deployment = {
      network: 'supra-testnet',
      chainId: 6,
      deployer: address,
      timestamp: new Date().toISOString(),
      modules: {
        veil_token: `${address}::veil_token`,
      },
      txHash,
    };

    fs.writeFileSync('scripts/move-deployment.json', JSON.stringify(deployment, null, 2));
    console.log('💾 Saved to scripts/move-deployment.json');
    console.log('✅ Deployment complete!');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployMove().catch(console.error);
