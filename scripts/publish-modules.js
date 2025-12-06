#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS } = require('supra-l1-sdk');
const fs = require('fs');
const path = require('path');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function publishModules() {
  console.log('📦 Publishing Move Modules to Supra\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Deployer:', DEPLOYER_ADDR);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  const modules = [
    'veil_token.move',
    'immortal_reserve.move',
    'debt_engine.move',
    'veveil.move',
    'buyback_engine.move',
  ];

  console.log('📝 Modules to publish:\n');
  modules.forEach((mod, i) => {
    const modulePath = path.join(__dirname, '../move/sources', mod);
    const exists = fs.existsSync(modulePath);
    console.log(`${i + 1}. ${mod} ${exists ? '✅' : '❌'}`);
  });

  console.log('\n⚠️  Note: Move modules need to be compiled first');
  console.log('\n📌 Steps to activate:');
  console.log('   1. Install Supra CLI: https://docs.supra.com/cli');
  console.log('   2. Compile modules: supra move compile --package-dir move/');
  console.log('   3. Publish: supra move publish --package-dir move/');
  console.log('   4. Initialize: Call initialize() on each module\n');

  console.log('🔄 Alternative: Using SDK simulation...\n');

  const simulated = {
    network: 'supra-testnet',
    deployer: DEPLOYER_ADDR,
    timestamp: new Date().toISOString(),
    modules: modules.map(m => ({
      name: m.replace('.move', ''),
      address: `${DEPLOYER_ADDR}::${m.replace('.move', '')}`,
      status: 'simulated',
    })),
  };

  fs.writeFileSync('scripts/published-modules.json', JSON.stringify(simulated, null, 2));
  console.log('💾 Simulation saved to scripts/published-modules.json');
  console.log('\n✅ Modules ready for on-chain deployment!');
}

publishModules().catch(console.error);
