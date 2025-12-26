'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Wallet, TrendingUp, Lock, Target, BarChart3, Shield, Zap } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Trade', href: '/trade' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Vaults', href: '/vaults' },
    { name: 'Governance', href: '/governance' },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$987.5M', change: '+12.3%' },
    { label: 'Monthly Revenue', value: '$4.2M', change: '+8.7%' },
    { label: 'Tokens Burned', value: '120M VEIL', change: '+2.1M' },
    { label: 'Active Users', value: '14,523', change: '+432' },
  ];

  const features = [
    {
      icon: Lock,
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow USDC at 5.5% fixed APR with 180% collateral ratio. Auto-repay protects your position.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Immortal Reserve',
      description: 'Burn VEIL for permanent shares. Earn 12-25% APY in monthly USDC dividends.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Target,
      title: 'Immortal Vaults',
      description: 'Auto-compounding strategies with 60% performance fee burn.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: BarChart3,
      title: 'Perpetual Trading',
      description: 'Trade with up to 50x leverage. 5bps fees, confidential orders.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'Advanced Lending',
      description: 'Fixed/variable rates, P2P matching, auto-optimizer.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Dual Restaking',
      description: 'Earn on EigenLayer and Symbiotic simultaneously.',
      gradient: 'from-yellow-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Supra L1</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/25">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-8">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-sm text-violet-300">Live on Supra L1 Testnet</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Veil Hub
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Final DeFi Organism
          </h2>

          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Real monthly USDC dividends. Permanent token burn. Privacy-protected everything.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-xl font-bold text-lg transition-all shadow-lg">
                Launch App
              </button>
            </Link>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-xl font-bold text-lg">
              Read Docs
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Complete DeFi <span className="text-violet-400">Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          © 2024 Veil Hub. Built on Supra L1. Immortal by design.
        </div>
      </footer>
    </div>
  );
}
