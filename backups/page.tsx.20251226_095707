'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Trade', href: '/trade' },
    { name: 'Vaults', href: '/vaults' },
    { name: 'Borrow', href: '/borrow' },
    { name: 'Governance', href: '/governance' },
    { name: 'Docs', href: '/docs' },
  ];

  const stats = [
    { label: 'TVL', value: '$3.24B' },
    { label: 'Annual Revenue', value: '$412M' },
    { label: 'Circulating', value: '180M VEIL' },
    { label: 'Your Dividend', value: isConnected ? '$0.00' : 'Connect to view' },
  ];

  const features = [
    {
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow USDC at competitive fixed APR with automated protections.',
    },
    {
      title: 'Immortal Reserve',
      description: 'Permanent token burn and monthly USDC dividends for holders.',
    },
    {
      title: 'Auto Vaults',
      description: 'Auto-compounding vaults with dynamic rebalancing.',
    },
    {
      title: 'Perps Trading',
      description: 'Low-fee perpetuals with confidential order routing.',
    },
    {
      title: 'Advanced Lending',
      description: 'Flexible collateral, fixed/variable lending markets.',
    },
    {
      title: 'Dual Restaking',
      description: 'Stack rewards across protocols for maximized yield.',
    },
    {
      title: 'Encrypted Governance',
      description: 'Private voting primitives for confidential governance.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                  <span className="font-bold text-lg">V</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  Veil Hub
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Supra L1</span>
              </div>

              <button
                onClick={() => setIsConnected(!isConnected)}
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/25"
              >
                {isConnected ? '0x742d...35ba' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Veil Hub: The Final DeFi Organism
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Real monthly USDC dividends. Permanent token burn. Privacy-protected
            everything. One dApp to rule DeFi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all shadow-lg shadow-violet-500/25">
              Connect Wallet
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-violet-500/50 rounded-xl font-bold text-lg transition-all">
              Lock VEIL & Boost Yield
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4"
              >
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all"
              >
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-slate-400 mb-8">
            Revenue → Dividends + Burn → Scarcity → Higher Yields → More TVL
          </p>
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-12">
            <p className="text-slate-500">(Animated flywheel placeholder)</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/borrow" className="hover:text-violet-400 transition-colors">
                    Borrowing
                  </Link>
                </li>
                <li>
                  <Link href="/vaults" className="hover:text-violet-400 transition-colors">
                    Vaults
                  </Link>
                </li>
                <li>
                  <Link href="/trade" className="hover:text-violet-400 transition-colors">
                    Trading
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Governance</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/governance" className="hover:text-violet-400 transition-colors">
                    Proposals
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    veVEIL
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Developers</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/docs" className="hover:text-violet-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Thabiiey411beta/veil-hub-v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400">
              © 2024 Veil Hub. Built on Supra L1. Immortal by design.
            </div>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-violet-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-violet-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-violet-400 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
