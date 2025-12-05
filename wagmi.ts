import { createConfig, http } from 'wagmi'
import { defineChain } from 'viem'
import { walletConnect, injected } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo'

// SupraEVM Testnet
const supraEVM = defineChain({
  id: 2,
  name: 'SupraEVM Testnet',
  network: 'supra-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'SUPRA',
    symbol: 'SUPRA',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.supra.com'],
    },
    public: {
      http: ['https://rpc-testnet.supra.com'],
    },
  },
  blockExplorers: {
    default: { name: 'SupraScan Testnet', url: 'https://testnet.suprascan.io' },
  },
})

export const config = createConfig({
  chains: [supraEVM],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [supraEVM.id]: http(),
  },
})