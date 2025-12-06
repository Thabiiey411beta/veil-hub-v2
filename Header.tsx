'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect } from 'react'
import { Menu, X, Wallet } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <header className="relative z-50 border-b border-cyber-border bg-cyber-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 animate-pulse-slow" />
            <span className="text-xl font-bold neon-text text-cyber-accent">VEIL HUB</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#universes" className="text-gray-300 hover:text-cyber-accent transition-colors">Universes</a>
            <a href="#vaults" className="text-gray-300 hover:text-cyber-accent transition-colors">Vaults</a>
            <a href="#docs" className="text-gray-300 hover:text-cyber-accent transition-colors">Docs</a>
            <a href="#governance" className="text-gray-300 hover:text-cyber-accent transition-colors">Governance</a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="px-3 py-2 bg-cyber-card border border-cyber-border rounded-lg text-sm">
                  {formatAddress(address!)}
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="relative group">
                <button className="cyber-button flex items-center space-x-2">
                  <Wallet size={16} />
                  <span>Connect Wallet</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-cyber-card border border-cyber-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      className="w-full px-4 py-3 text-left hover:bg-cyber-border transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center space-x-2"
                    >
                      {connector.id === 'starkey' && <span className="text-purple-400">⭐</span>}
                      <span>{connector.name === 'Injected' && connector.id === 'starkey' ? 'Starkey Wallet' : connector.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-cyber-accent"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyber-border">
            <nav className="flex flex-col space-y-4">
              <a href="#universes" className="text-gray-300 hover:text-cyber-accent transition-colors">Universes</a>
              <a href="#vaults" className="text-gray-300 hover:text-cyber-accent transition-colors">Vaults</a>
              <a href="#docs" className="text-gray-300 hover:text-cyber-accent transition-colors">Docs</a>
              <a href="#governance" className="text-gray-300 hover:text-cyber-accent transition-colors">Governance</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}