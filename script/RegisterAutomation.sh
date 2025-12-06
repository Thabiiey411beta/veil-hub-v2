#!/bin/bash

# Register Veil Hub automation tasks on Supra L1

# Auto-repay task (checks every block)
supra move automation register \
  --task-max-gas-amount 100000 \
  --task-gas-price-cap 500 \
  --task-expiry-time-secs 1893456000 \
  --task-automation-fee-cap 50000 \
  --function-id "0x1::automation_keeper::autoRepayDebt" \
  --args address:0x9516494976a6de49218b86c96cceac7eb0366de6610d068e861b3636beec1915

# Auto-harvest task (weekly)
supra move automation register \
  --task-max-gas-amount 200000 \
  --task-gas-price-cap 500 \
  --task-expiry-time-secs 1893456000 \
  --task-automation-fee-cap 100000 \
  --function-id "0x1::automation_keeper::autoHarvestYields"

echo "✅ Automation tasks registered on Supra L1"
