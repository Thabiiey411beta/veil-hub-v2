#!/usr/bin/env node
const { SupraClient } = require('supra-l1-sdk');
const fs = require('fs');

const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function setupAutomation() {
  console.log('🤖 Setting Up Supra AutoFi Automation\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Account:', DEPLOYER_ADDR);
  console.log('💰 Balance:', Number(balance) / 1e8, 'SUPRA\n');

  const automationTasks = [
    {
      name: 'Auto Harvest Yields',
      module: `${DEPLOYER_ADDR}::veil_automation`,
      function: 'auto_harvest_yields',
      interval: '7 days',
      conditions: [
        'Pending yield > 100 USDC',
        'Market conditions favorable',
        'Gas price < threshold',
      ],
      description: 'Automatically harvest vault yields and distribute to Immortal Reserve',
    },
    {
      name: 'Auto Repay Debt',
      module: `${DEPLOYER_ADDR}::veil_automation`,
      function: 'auto_repay_debt',
      interval: '1 hour',
      conditions: [
        'Collateral ratio < 130%',
        'Position at risk',
        'USDC available in reserve',
      ],
      description: 'Automatically repay debt when positions approach liquidation',
    },
    {
      name: 'Auto Buyback & Burn',
      module: `${DEPLOYER_ADDR}::buyback_engine`,
      function: 'execute_buyback',
      interval: '1 day',
      conditions: [
        'USDC reserve > 1000',
        'VEIL price favorable',
        'Slippage < 2%',
      ],
      description: 'Execute buyback with 30% of interest revenue and burn VEIL',
    },
    {
      name: 'Distribute Dividends',
      module: `${DEPLOYER_ADDR}::immortal_reserve`,
      function: 'distribute_dividends',
      interval: '7 days',
      conditions: [
        'USDC balance > 0',
        'Immortal shares > 0',
        'Week elapsed',
      ],
      description: 'Distribute weekly USDC dividends to Immortal Share holders',
    },
  ];

  console.log('📋 Automation Tasks:\n');
  automationTasks.forEach((task, i) => {
    console.log(`${i + 1}. ${task.name}`);
    console.log(`   📦 Module: ${task.function}`);
    console.log(`   ⏰ Interval: ${task.interval}`);
    console.log(`   ✅ Conditions: ${task.conditions.length}`);
    console.log(`   📝 ${task.description}\n`);
  });

  const automation = {
    network: 'supra-testnet',
    deployer: DEPLOYER_ADDR,
    timestamp: new Date().toISOString(),
    tasks: automationTasks,
    status: 'configured',
  };

  fs.writeFileSync('scripts/automation-config.json', JSON.stringify(automation, null, 2));
  
  console.log('💾 Automation config saved to scripts/automation-config.json');
  console.log('\n✅ Automation configured!');
  console.log('\n📌 Register with Supra AutoFi:');
  console.log('   1. Deploy veil_automation.move module');
  console.log('   2. Register tasks with Supra AutoFi');
  console.log('   3. Fund automation account with SUPRA for gas');
}

setupAutomation().catch(console.error);
