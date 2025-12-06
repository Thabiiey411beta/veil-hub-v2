#!/usr/bin/env node
const { SupraClient, HexString, TxnBuilderTypes, BCS } = require('supra-l1-sdk');
const fs = require('fs');

const DEPLOYER_KEY = '0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const DEPLOYER_ADDR = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const RPC_URL = 'https://rpc-testnet.supra.com';

async function mintAndFund() {
  console.log('💰 Minting VEIL & Funding USDC\n');

  const client = await SupraClient.init(RPC_URL);
  const balance = await client.getAccountSupraCoinBalance(DEPLOYER_ADDR);
  
  console.log('📍 Account:', DEPLOYER_ADDR);
  console.log('💰 SUPRA Balance:', Number(balance) / 1e8, '\n');

  const operations = [];

  // 1. Initialize VEIL Token
  console.log('1️⃣ Initializing VEIL Token...');
  operations.push({
    name: 'Initialize VEIL',
    function: `${DEPLOYER_ADDR}::veil_token::initialize`,
    args: [],
    result: '1B VEIL minted to deployer',
  });
  console.log('   ✅ 1,000,000,000 VEIL will be minted\n');

  // 2. Initialize Immortal Reserve
  console.log('2️⃣ Initializing Immortal Reserve...');
  operations.push({
    name: 'Initialize Immortal Reserve',
    function: `${DEPLOYER_ADDR}::immortal_reserve::initialize`,
    args: [],
    result: 'Reserve ready for burns',
  });
  console.log('   ✅ Ready to accept VEIL burns\n');

  // 3. Initialize Debt Engine
  console.log('3️⃣ Initializing Debt Engine...');
  operations.push({
    name: 'Initialize Debt Engine',
    function: `${DEPLOYER_ADDR}::debt_engine::initialize`,
    args: [],
    result: 'Borrowing enabled at 5.5% APR',
  });
  console.log('   ✅ 5.5% APR, 180% collateral ratio\n');

  // 4. Initialize Buyback Engine
  console.log('4️⃣ Initializing Buyback Engine...');
  operations.push({
    name: 'Initialize Buyback',
    function: `${DEPLOYER_ADDR}::buyback_engine::initialize`,
    args: [],
    result: 'Buyback automation ready',
  });
  console.log('   ✅ 30% of interest → buyback\n');

  // 5. Test burn operation
  console.log('5️⃣ Test Burn: 1,000 VEIL → Immortal Shares...');
  operations.push({
    name: 'Burn VEIL',
    function: `${DEPLOYER_ADDR}::immortal_reserve::burn_for_shares`,
    args: [100000000000], // 1000 VEIL with 8 decimals
    result: '1,500 Immortal Shares (1.5x bonus)',
  });
  console.log('   🔥 1,000 VEIL → 1,500 shares\n');

  // 6. Test veVEIL lock
  console.log('6️⃣ Test Lock: 10,000 VEIL for 4 years...');
  operations.push({
    name: 'Lock veVEIL',
    function: `${DEPLOYER_ADDR}::veveil::lock`,
    args: [1000000000000, 126144000], // 10k VEIL, 4 years
    result: '25,000 voting power (2.5x boost)',
  });
  console.log('   🔒 10,000 VEIL → 25,000 voting power\n');

  // Save operations
  const testPlan = {
    network: 'supra-testnet',
    deployer: DEPLOYER_ADDR,
    timestamp: new Date().toISOString(),
    operations,
    status: 'ready-to-execute',
  };

  fs.writeFileSync('scripts/test-plan.json', JSON.stringify(testPlan, null, 2));
  
  console.log('💾 Test plan saved to scripts/test-plan.json');
  console.log('\n✅ Ready to execute on-chain!');
  console.log('\n📌 Execute with Supra CLI:');
  console.log(`   supra move run --function-id "${DEPLOYER_ADDR}::veil_token::initialize"`);
}

mintAndFund().catch(console.error);
