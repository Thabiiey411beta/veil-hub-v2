#!/bin/bash

echo "🚀 Deploying Veil Hub Automation to Supra L1 Testnet"

# 1. Publish Move package
echo "📦 Publishing Move package..."
supra move tool publish \
  --package-dir /workspaces/veil-hub-v2 \
  --rpc-url https://rpc-testnet.supra.com

# 2. Get last reconfiguration time
echo "⏰ Calculating task expiry time..."
LAST_RECONFIG=$(curl -s 'https://rpc-testnet.supra.com/rpc/v2/accounts/1/resources/0x1%3A%3Areconfiguration%3A%3AConfiguration' | grep -o '"last_reconfiguration_time":"[0-9]*"' | grep -o '[0-9]*')
LAST_RECONFIG_SEC=$((LAST_RECONFIG / 1000000))
EXPIRY_TIME=$((LAST_RECONFIG_SEC + 7200 + 300))

echo "Expiry time: $EXPIRY_TIME"

# 3. Estimate automation fee
echo "💰 Estimating automation fee..."
FEE=$(curl -s --request POST \
  --url https://rpc-testnet.supra.com/rpc/v2/view \
  --header 'Content-Type: application/json' \
  --data '{"function":"0x1::automation_registry::estimate_automation_fee","type_arguments":[],"arguments":["100000"]}' | grep -o '"[0-9]*"' | grep -o '[0-9]*')

echo "Estimated fee: $FEE"

# 4. Register auto-harvest task
echo "🌾 Registering auto-harvest task..."
supra move automation register \
  --task-max-gas-amount 100000 \
  --task-gas-price-cap 500 \
  --task-expiry-time-secs $EXPIRY_TIME \
  --task-automation-fee-cap $FEE \
  --function-id "0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915::veil_automation::auto_harvest_yields" \
  --rpc-url https://rpc-testnet.supra.com

echo "✅ Veil Hub Automation deployed successfully!"
echo "📊 Check status at: https://testnet.suprascan.io"