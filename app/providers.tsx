'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { config } from '../config/wagmi'
import { useState } from 'react'

const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => queryClientConfig)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="midnight" options={{ initialChainId: 6 }}>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}