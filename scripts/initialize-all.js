#!/usr/bin/env node
const { SupraClient, SupraAccount } = require('supra-l1-sdk');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function initializeAll() {
  console.log('⚡ Initializing All Modules\n');

  const client = await SupraClient.init(RPC_URL);
  const account = new SupraAccount(Buffer.from(DEPLOYER_KEY.slice(2), 'hex'));
  
  const modules = [
    { name: 'VEIL Token', function: 'veil_token::initialize' },
    { name: 'Immortal Reserve', function: 'immortal_reserve::initialize' },
    { name: 'Debt Engine', function: 'debt_engine::initialize' },
    { name: 'Buyback Engine', function: 'buyback_engine::initialize' },
  ];

  for (const mod of modules) {
    console.log(`⏳ Initializing ${mod.name}...`);
    
    try {
      const payload = {
        function: `${DEPLOYER_ADDR}::${mod.function}`,
        type_arguments: [],
        arguments: [],
      };

      const tx = await client.sendTx(account, { EntryFunction: payload });
      console.log(`✅ ${mod.name}: ${tx.txHash || tx}`);
      console.log(`🔗 https://testnet.suprascan.io/tx/${tx.txHash || tx}\n`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.log(`❌ ${mod.name}: ${error.message}\n`);
    }
  }

  console.log('✅ All modules initialized!\n');
  console.log('🔗 View account: https://testnet.suprascan.io/account/' + DEPLOYER_ADDR);
}

initializeAll().catch(console.error);
