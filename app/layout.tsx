import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Veil Hub - The Final DeFi Organism',
  description: 'Zero-liquidation DeFi protocol on Supra L1',
  keywords: 'DeFi, Supra L1, yield farming, zero liquidation, crypto',
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
      <body className={inter.className}>
        <Providers>
          <Toaster position="top-right" />
          <Sidebar />
          <div className="ml-64 transition-all duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
