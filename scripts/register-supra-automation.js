const { SupraClient, SupraAccount } = require('supra-l1-sdk');

const PRIVATE_KEY = '1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';
const MODULE_ADDRESS = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';
const MAX_GAS = 500000;
const GAS_PRICE = 100;

async function registerAutomation() {
    console.log('🤖 Registering Supra Automation tasks...\n');
    
    const client = await SupraClient.init(RPC_URL);
    const account = new SupraAccount(Buffer.from(PRIVATE_KEY, 'hex'));
    
    // Task 1: Auto-harvest (every 7 days)
    const harvestPayload = {
        function: `${MODULE_ADDRESS}::veil_automation::auto_harvest_yields`,
        ty_args: [],
        args: [],
        max_gas: MAX_GAS,
        gas_unit_price: GAS_PRICE
    };
    
    console.log('📦 Registering auto-harvest task...');
    const harvestTx = await client.sendTx(account, {
        EntryFunction: harvestPayload
    });
    console.log('✅ Auto-harvest TX:', harvestTx);
    
    // Task 2: Auto-repay (every 1 hour)
    const repayPayload = {
        function: `${MODULE_ADDRESS}::veil_automation::auto_repay_debt`,
        ty_args: [],
        args: [
            Array.from(Buffer.from(MODULE_ADDRESS.slice(2), 'hex')),
            [12000]
        ],
        max_gas: MAX_GAS,
        gas_unit_price: GAS_PRICE
    };
    
    console.log('📦 Registering auto-repay task...');
    const repayTx = await client.sendTx(account, {
        EntryFunction: repayPayload
    });
    console.log('✅ Auto-repay TX:', repayTx);
    
    console.log('\n🎉 All automation tasks registered!');
}

registerAutomation().catch(console.error);
