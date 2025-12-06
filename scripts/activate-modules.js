#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS } = require('supra-l1-sdk');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function activateModules() {
  console.log('⚡ Activating Veil Hub Modules\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Deployer:', DEPLOYER_ADDR);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  const modules = [
    { name: 'VEIL Token', function: 'veil_token::initialize' },
    { name: 'Immortal Reserve', function: 'immortal_reserve::initialize' },
    { name: 'Debt Engine', function: 'debt_engine::initialize' },
    { name: 'Buyback Engine', function: 'buyback_engine::initialize' },
  ];

  for (const module of modules) {
    console.log(`⏳ Activating ${module.name}...`);
    
    try {
      const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
          `${DEPLOYER_ADDR}::${module.function}`,
          [],
          []
        )
      );

      const rawTxn = await client.generateRawTransaction(
        DEPLOYER_ADDR,
        payload
      );

      const privateKey = new HexString(DEPLOYER_KEY);
      const signedTxn = await client.signTransaction(privateKey, rawTxn);
      const txHash = await client.submitTransaction(signedTxn);

      console.log(`   ✅ ${module.name} activated`);
      console.log(`   📝 TX: ${txHash}\n`);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.log(`   ⚠️  ${module.name}: ${error.message}\n`);
    }
  }

  console.log('✅ Module activation complete!');
  console.log('\n🔗 View on explorer:');
  console.log(`https://testnet.suprascan.io/address/${DEPLOYER_ADDR}/f?tab=transactions`);
}

activateModules().catch(console.error);
