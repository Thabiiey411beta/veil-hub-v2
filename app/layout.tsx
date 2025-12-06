import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Veil Hub - The Final DeFi Organism',
  description: 'Zero-liquidation DeFi protocol with perpetual yield on SupraEVM',
  keywords: 'DeFi, SupraEVM, yield farming, zero liquidation, crypto',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8b5cf6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://rpc-testnet.supra.com" />
        <link rel="dns-prefetch" href="https://testnet.suprascan.io" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}