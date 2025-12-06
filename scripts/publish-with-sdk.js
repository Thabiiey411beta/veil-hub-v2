#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS } = require('supra-l1-sdk');
const fs = require('fs');
const path = require('path');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function publishModules() {
  console.log('📦 Publishing Move Modules with Supra SDK\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Deployer:', DEPLOYER_ADDR);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  // Read compiled bytecode
  const modules = [
    'veil_token.mv',
    'immortal_reserve.mv',
    'debt_engine.mv',
    'veveil.mv',
    'buyback_engine.mv',
  ];

  const bytecodes = [];
  
  for (const mod of modules) {
    const bytePath = path.join(__dirname, '../move/build/VeilHub/bytecode_modules', mod);
    if (fs.existsSync(bytePath)) {
      const bytecode = fs.readFileSync(bytePath);
      bytecodes.push(bytecode);
      console.log(`✅ Loaded ${mod} (${bytecode.length} bytes)`);
    } else {
      console.log(`❌ Missing ${mod}`);
    }
  }

  if (bytecodes.length === 0) {
    console.log('\n❌ No bytecode found. Run: cd move && aptos move compile');
    process.exit(1);
  }

  console.log(`\n📦 Publishing ${bytecodes.length} modules...\n`);

  try {
    // Create account from private key
    const { SupraAccount } = require('supra-l1-sdk');
    const account = new SupraAccount(Buffer.from(DEPLOYER_KEY.slice(2), 'hex'));
    
    // Create package metadata
    const metadata = Buffer.from([]);

    console.log('⏳ Submitting transaction...');
    
    const txHash = await client.publishPackage(
      account,
      metadata,
      bytecodes
    );

    console.log('✅ Published!');
    console.log('📝 TX Hash:', txHash);
    console.log('🔗 Explorer:', `https://testnet.suprascan.io/tx/${txHash}\n`);

    // Save deployment
    const deployment = {
      network: 'supra-testnet',
      deployer: DEPLOYER_ADDR,
      timestamp: new Date().toISOString(),
      txHash,
      modules: modules.map(m => `${DEPLOYER_ADDR}::${m.replace('.mv', '')}`),
    };

    fs.writeFileSync('scripts/sdk-deployment.json', JSON.stringify(deployment, null, 2));
    console.log('💾 Saved to scripts/sdk-deployment.json');
    
  } catch (error) {
    console.error('❌ Publish failed:', error.message);
    console.error(error);
  }
}

publishModules().catch(console.error);
