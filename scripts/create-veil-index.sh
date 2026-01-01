#!/bin/bash
# Create VEIL DeFi Index on Supra L1
# Index: BTC, ETH, LINK, AVAX, DOT (equal weighted)

TESTNET_MODULE="0x5615001f63d3223f194498787647bb6f8d37b8d1e6773c00dcdd894079e56190"
MAINNET_MODULE="0xe3948c9e3a24c51c4006ef2acc44606055117d021158f320062df099c4a94150"

PAIR_IDS="u32:[0,1,2,5,6]"  # BTC, ETH, LINK, AVAX, DOT
WEIGHTS="u32:[20,20,20,20,20]"  # Equal weighted
INIT_VALUE="u32:1000"  # Start at 1000

echo "Creating VEIL DeFi Index on Supra L1 Testnet..."

supra move tool run \
  --function-id "${TESTNET_MODULE}::supra_oracle_indices::create_index_with_init_value" \
  --args "${PAIR_IDS}" "${WEIGHTS}" "${INIT_VALUE}" \
  --profile veil_deployer \
  --url https://rpc-testnet.supra.com

echo "Index created! Save the index_obj_addr from the receipt."
