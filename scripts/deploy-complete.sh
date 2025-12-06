#!/bin/bash

echo "🚀 Veil Hub v14 - Complete Testnet Deployment"
echo "=============================================="

PRIVATE_KEY="0x1c8d05fe8e1522b842d997f9f64dc765ee57154ba3258799aea100cf0fa98dd3"
DEPLOYER="0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915"
RPC_URL="https://rpc-testnet.supra.com"

echo ""
echo "📍 Deployer Address: $DEPLOYER"
echo "🌐 Network: Supra L1 Testnet"
echo "🔗 RPC: $RPC_URL"
echo ""

# Check balance
echo "💰 Checking balance..."
BALANCE=$(curl -s -X POST $RPC_URL \
  -H "Content-Type: application/json" \
  -d "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBalance\",\"params\":[\"$DEPLOYER\",\"latest\"],\"id\":1}" \
  | grep -o '"result":"[^"]*"' | cut -d'"' -f4)

if [ -z "$BALANCE" ] || [ "$BALANCE" == "0x0" ]; then
    echo "❌ No balance found. Please fund the deployer address:"
    echo "   Address: $DEPLOYER"
    echo "   Faucet: https://faucet.supra.com"
    exit 1
fi

echo "✅ Balance: $BALANCE"
echo ""

# Get testnet funds
echo "💸 Requesting testnet funds from faucet..."
echo "   Visit: https://faucet.supra.com"
echo "   Address: $DEPLOYER"
echo ""
echo "⏳ Waiting 30 seconds for funds..."
sleep 30

# Deploy contracts
echo "📦 Deploying contracts..."
node deploy-testnet-simple.js

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check deployment-addresses.json for contract addresses"
echo "2. Update .env with deployed addresses"
echo "3. Verify contracts on https://testnet.suprascan.io"
echo "4. Test the dApp at http://localhost:3000"
