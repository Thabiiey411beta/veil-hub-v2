const { SupraClient } = require('supra-l1-sdk');

const RPC_URL = 'https://rpc-testnet.supra.com';
const MODULE_ADDRESS = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';

async function queryAutomationState() {
    const client = await SupraClient.init(RPC_URL);
    
    const resource = {
        address: MODULE_ADDRESS,
        module: 'veil_automation',
        name: 'AutomationState',
        type_args: []
    };
    
    try {
        const state = await client.getAccountResource(MODULE_ADDRESS, resource);
        
        console.log('🤖 Automation State:');
        console.log('  Last Harvest:', new Date(state.data.last_harvest_time * 1000).toISOString());
        console.log('  Total Harvests:', state.data.total_harvests);
        console.log('  Total Repays:', state.data.total_repays);
        console.log('  Last Rebalance:', new Date(state.data.last_rebalance_time * 1000).toISOString());
    } catch (error) {
        console.log('❌ AutomationState not initialized yet');
        console.log('   Run: node script/register-supra-automation.js');
    }
}

queryAutomationState().catch(console.error);
