'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GradientCard } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState('getting-started')

  const docs = {
    'getting-started': [
      { title: 'Introduction', href: '#intro', desc: 'Overview of Veil Hub' },
      { title: 'Installation', href: '#install', desc: 'Setup and configuration' },
      { title: 'Quick Start', href: '#quickstart', desc: 'Your first transaction' },
    ],
    'borrowing': [
      { title: 'Zero-Liquidation', href: '#zero-liq', desc: 'How borrowing works' },
      { title: 'Collateral Ratios', href: '#collateral', desc: 'Collateral requirements' },
      { title: 'Interest Rates', href: '#rates', desc: 'APR and fee structure' },
    ],
    'vaults': [
      { title: 'ERC-4626 Vaults', href: '#erc4626', desc: 'Vault standards' },
      { title: 'Strategies', href: '#strategies', desc: 'Available strategies' },
      { title: 'Yields', href: '#yields', desc: 'APY calculations' },
    ],
    'governance': [
      { title: 'veVEIL', href: '#veveil', desc: 'Vote-escrowed tokens' },
      { title: 'Voting', href: '#voting', desc: 'Governance voting' },
      { title: 'Proposals', href: '#proposals', desc: 'Creating proposals' },
    ],
    'api': [
      { title: 'REST API', href: '#rest', desc: 'API endpoints' },
      { title: 'WebSocket', href: '#ws', desc: 'Real-time updates' },
      { title: 'SDK', href: '#sdk', desc: 'JavaScript SDK' },
    ],
  }

  const categories = [
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'borrowing', label: 'Borrowing', icon: '💳' },
    { id: 'vaults', label: 'Vaults', icon: '🏦' },
    { id: 'governance', label: 'Governance', icon: '🗳️' },
    { id: 'api', label: 'API', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-[#B0B0B0]">Complete guides and API reference</p>
        </div>

        {/* Search */}
        <GradientCard className="mb-8">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg px-4 py-3 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none"
          />
        </GradientCard>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#FFD700]/20 border border-[#FFD700] text-[#FFD700]'
                      : 'bg-[#0A0A0A] border border-[#FFD700]/10 text-[#B0B0B0] hover:border-[#FFD700]/30'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <GradientCard>
              <h2 className="text-2xl font-bold mb-6 text-[#FFD700]">
                {categories.find(c => c.id === selectedCategory)?.label}
              </h2>

              <div className="space-y-4">
                {docs[selectedCategory as keyof typeof docs]?.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.href}
                    className="block p-4 bg-[#0A0A0A] border border-[#FFD700]/10 rounded-lg hover:border-[#FFD700]/50 transition-all group"
                  >
                    <h3 className="font-bold text-[#FFD700] group-hover:text-[#FFA500] transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-[#B0B0B0] mt-1">{doc.desc}</p>
                  </a>
                ))}
              </div>
            </GradientCard>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-3">📚 Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Whitepaper</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">GitHub</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Audits</Link></li>
            </ul>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-3">🔗 Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Website</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Discord</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Twitter</Link></li>
            </ul>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-3">💬 Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">FAQ</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Contact</Link></li>
              <li><Link href="#" className="text-[#FFD700] hover:text-[#FFA500]">Report Bug</Link></li>
            </ul>
          </GradientCard>
        </div>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="docs" />
      </div>
    </div>
  )
}
