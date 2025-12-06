#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS, TransactionBuilder } = require('supra-l1-sdk');
const fs = require('fs');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function realDeploy() {
  console.log('🚀 Real On-Chain Deployment\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Deployer:', DEPLOYER_ADDR);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  // Read Move source files
  const modules = [
    'veil_token',
    'immortal_reserve', 
    'debt_engine',
    'veveil',
    'buyback_engine',
  ];

  console.log('📦 Preparing module bytecode...\n');

  for (const mod of modules) {
    const sourcePath = `move/sources/${mod}.move`;
    console.log(`${mod}:`);
    console.log(`   Source: ${sourcePath}`);
    console.log(`   Status: Ready for compilation`);
    console.log(`   Address: ${DEPLOYER_ADDR}::${mod}\n`);
  }

  console.log('⚠️  ISSUE: Move modules need compilation with Supra CLI\n');
  console.log('📌 To deploy for real:\n');
  console.log('1. Install Supra CLI:');
  console.log('   curl -fsSL https://cli.supra.com/install.sh | bash\n');
  console.log('2. Compile modules:');
  console.log('   cd move && supra move compile\n');
  console.log('3. Publish to testnet:');
  console.log('   supra move publish --network testnet --private-key ' + DEPLOYER_KEY + '\n');
  console.log('4. Initialize each module:');
  console.log('   supra move run --function ' + DEPLOYER_ADDR + '::veil_token::initialize\n');

  // Try simple transaction to prove account works
  console.log('🧪 Testing account with simple transaction...\n');
  
  try {
    const accountInfo = await client.getAccountInfo(DEPLOYER_ADDR);
    console.log('✅ Account exists');
    console.log('   Sequence:', accountInfo.sequence_number);
    console.log('   Balance:', Number(balance) / 1e8, 'SUPRA\n');

    // Try to send 0.1 SUPRA to self as test
    console.log('⏳ Sending test transaction (0.1 SUPRA to self)...');
    
    const txOptions = {
      maxGasAmount: BigInt(5000),
      gasUnitPrice: BigInt(100),
      expireTimestamp: BigInt(Math.floor(Date.now() / 1000) + 600),
    };

    const tx = await client.transferSupraCoin(
      HexString.ensure(DEPLOYER_KEY),
      DEPLOYER_ADDR,
      10000000, // 0.1 SUPRA
      txOptions
    );

    console.log('✅ Test TX:', tx);
    console.log('🔗 View:', `https://testnet.suprascan.io/tx/${tx}\n`);
    
    console.log('✅ Account is active and can send transactions!');
    console.log('📌 Now deploy Move modules with Supra CLI');
    
  } catch (error) {
    console.log('❌ Transaction failed:', error.message);
  }
}

realDeploy().catch(console.error);
