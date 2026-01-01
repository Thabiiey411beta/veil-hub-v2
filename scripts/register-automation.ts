import { SupraClient, SupraAccount } from 'supra-l1-sdk';

const PRIVATE_KEY = '1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3';
const RPC_URL = 'https://rpc-testnet.supra.com';
const MODULE_ADDRESS = '0x2d67de8ca7388ce996b1da083b0d291e874b4c932377cd749b56bc798ecd5a5e';

async function registerAutomation() {
    const client = await SupraClient.init(RPC_URL);
    const account = new SupraAccount(Buffer.from(PRIVATE_KEY, 'hex'));
    
    // Auto-harvest task
    const harvestPayload = {
        AutomationRegistration: {
            module_address: MODULE_ADDRESS,
            module_name: 'veil_automation',
            function_name: 'auto_harvest',
            ty_args: [],
            args: [],
            schedule_seconds: 604800, // 7 days
            gas_budget: 100000,
            recurring: true
        }
    };
    
    const harvestTx = await client.sendTxAndWaitForResponse(
        account,
        harvestPayload
    );
    
    console.log('✅ Auto-harvest registered:', harvestTx.txHash);
    
    // Auto-repay task
    const repayPayload = {
        AutomationRegistration: {
            module_address: MODULE_ADDRESS,
            module_name: 'veil_automation',
            function_name: 'auto_repay',
            ty_args: [],
            args: [],
            schedule_seconds: 3600, // 1 hour
            gas_budget: 150000,
            recurring: true
        }
    };
    
    const repayTx = await client.sendTxAndWaitForResponse(
        account,
        repayPayload
    );
    
    console.log('✅ Auto-repay registered:', repayTx.txHash);
}

registerAutomation().catch(console.error);
