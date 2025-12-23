"use client";

import React from 'react';
import {
  Lock,
  Flame,
  Target,
  BarChart3,
  Shield,
  Zap,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Lock,
      title: 'Zero-Liquidation Borrowing',
      description: 'Borrow USDC at competitive fixed APR with automated protections.',
      gradient: 'from-violet-500 to-pink-500',
    },
    {
      icon: Flame,
      title: 'Immortal Reserve',
      description: 'Permanent token burn and monthly USDC dividends for holders.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Target,
      title: 'Auto Vaults',
      description: 'Auto-compounding vaults with dynamic rebalancing.',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      icon: BarChart3,
      title: 'Perps Trading',
      description: 'Low-fee perpetuals with confidential order routing.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Advanced Lending',
      description: 'Flexible collateral, fixed/variable lending markets.',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Dual Restaking',
      description: 'Stack rewards across protocols for maximized yield.',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      icon: Users,
      title: 'Encrypted Governance',
      description: 'Private voting primitives for confidential governance.',
      gradient: 'from-violet-600 to-indigo-500',
    },
  ];

  const stats = [
    { label: 'TVL', value: '$3.24B' },
    { label: 'Annual Revenue', value: '$412M' },
    { label: 'Circulating', value: '180M VEIL' },
    { label: 'Your Dividend', value: 'Connect to view' },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-gray-100">
      <header className="py-6 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center font-bold text-black">V</div>
          <div className="font-semibold text-lg">Veil Hub</div>
        </div>
        <div>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-pink-500 text-black font-medium">Connect Wallet</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#05030a] via-[#12021a] to-[#000] p-12 mt-6">
          <div className="absolute -inset-20 opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(139,92,246,0.25), transparent 15%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.18), transparent 20%)' }} />
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold">Veil Hub: The Final DeFi Organism</h1>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">Real monthly USDC dividends. Permanent token burn. Privacy-protected everything. One dApp to rule DeFi.</p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-6 py-3 rounded-md bg-gradient-to-r from-violet-500 to-pink-500 text-black font-semibold">Connect Wallet</button>
              <button className="px-6 py-3 rounded-md border border-gray-700 text-gray-100">Lock VEIL &amp; Boost Yield</button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400">{s.label}</div>
              <div className="mt-2 text-2xl font-semibold">{s.value}</div>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Features</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-gray-900/40 p-4 rounded-lg border border-gray-800 flex gap-3 items-start">
                  <div className="p-2 rounded-md bg-gradient-to-br from-violet-600 to-pink-500 text-black"><Icon /></div>
                  <div>
                    <div className="font-semibold">{f.title}</div>
                    <div className="text-sm text-gray-400">{f.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12 mb-20">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="mt-6 bg-gray-900/50 p-6 rounded-lg border border-gray-800 text-center">
            <div className="text-lg font-medium">Revenue → Dividends + Burn → Scarcity → Higher Yields → More TVL</div>
            <div className="mt-4 text-sm text-gray-400">(Animated flywheel placeholder)</div>
          </div>
        </section>
      </main>
    </div>
  );
}
