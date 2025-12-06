'use client'

import { useState } from 'react'
import { Menu, X, Wallet } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAddress(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress('')
  }

  return (
    <header className="relative z-50 border-b border-gray-800/50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse" />
            <span className="text-xl font-bold neon-text text-cyan-400">VEIL HUB</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#universes" className="text-gray-300 hover:text-cyan-400 transition-colors">Universes</a>
            <a href="#vaults" className="text-gray-300 hover:text-cyan-400 transition-colors">Vaults</a>
            <a href="#docs" className="text-gray-300 hover:text-cyan-400 transition-colors">Docs</a>
            <a href="#governance" className="text-gray-300 hover:text-cyan-400 transition-colors">Governance</a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-2 glass-effect rounded-lg text-sm">
                  {formatAddress(address)}
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={connectWallet} className="cyber-button flex items-center space-x-2">
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800/50">
            <nav className="flex flex-col space-y-4">
              <a href="#universes" className="text-gray-300 hover:text-cyan-400 transition-colors">Universes</a>
              <a href="#vaults" className="text-gray-300 hover:text-cyan-400 transition-colors">Vaults</a>
              <a href="#docs" className="text-gray-300 hover:text-cyan-400 transition-colors">Docs</a>
              <a href="#governance" className="text-gray-300 hover:text-cyan-400 transition-colors">Governance</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}