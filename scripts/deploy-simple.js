#!/usr/bin/env node
const { SupraClient, HexString } = require('supra-l1-sdk');
const fs = require('fs');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function deploy() {
  console.log('🚀 Veil Hub v14 - Supra Testnet Deployment\n');

  const client = await SupraClient.init(RPC_URL);

  console.log('📍 Deployer:', DEPLOYER_ADDR);

  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  const balanceSupra = Number(balance) / 1e8;
  console.log('💰 Balance:', balanceSupra, 'SUPRA\n');

  if (balanceSupra < 5) {
    console.log('❌ Insufficient balance');
    process.exit(1);
  }

  console.log('✅ Ready to deploy Move modules');
  console.log('\n📝 Deployment Plan:');
  console.log('   1. veil_token - ERC20-like token');
  console.log('   2. immortal_reserve - Burn & dividend system');
  console.log('   3. debt_engine - Zero-liquidation borrowing');
  console.log('   4. veveil - Vote-escrowed governance');
  console.log('   5. buyback_engine - Automated buyback & burn\n');

  const deployment = {
    network: 'supra-testnet',
    chainId: 6,
    deployer: DEPLOYER_ADDR,
    timestamp: new Date().toISOString(),
    status: 'ready',
    balance: balanceSupra,
    modules: {
      veil_token: `${DEPLOYER_ADDR}::veil_token`,
      immortal_reserve: `${DEPLOYER_ADDR}::immortal_reserve`,
      debt_engine: `${DEPLOYER_ADDR}::debt_engine`,
      veveil: `${DEPLOYER_ADDR}::veveil`,
      buyback_engine: `${DEPLOYER_ADDR}::buyback_engine`,
    },
  };

  fs.writeFileSync('scripts/deployment-ready.json', JSON.stringify(deployment, null, 2));
  console.log('💾 Deployment config saved to scripts/deployment-ready.json');
  console.log('\n✅ Pre-deployment check complete!');
  console.log('\n📌 Next: Compile Move modules and deploy');
}

deploy().catch(console.error);
