'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon: string
  category: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: '🏠', category: 'main' },
  { label: 'Dashboard', href: '/dashboard', icon: '📊', category: 'trading' },
  { label: 'Analytics', href: '/analytics', icon: '📈', category: 'trading' },
  { label: 'DEX', href: '/dex', icon: '💱', category: 'trading' },
  { label: 'Tokenomics', href: '/tokenomics', icon: '💎', category: 'protocol' },
  { label: 'Vaults', href: '/vaults', icon: '🏦', category: 'protocol' },
  { label: 'Governance', href: '/governance', icon: '🗳️', category: 'protocol' },
  { label: 'Borrow', href: '/borrow', icon: '💰', category: 'protocol' },
  { label: 'Docs', href: '/docs', icon: '📚', category: 'info' },
  { label: 'Magic', href: '/magic', icon: '✨', category: 'tools' },
]

export const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const categories = {
    main: 'Main',
    trading: 'Trading',
    protocol: 'Protocol',
    info: 'Information',
    tools: 'Tools',
  }

  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, NavItem[]>)

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1a1a2e] border-r border-[#FFD700]/10 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#FFD700]/10 flex justify-between items-center">
        {!collapsed && (
          <h2 className="text-lg font-bold">
            <span className="text-[#FFD700]">◆</span> VEIL
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#FFD700] hover:bg-[#FFD700]/10 p-2 rounded transition-colors"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            {!collapsed && (
              <h3 className="text-xs font-bold text-[#FFD700] uppercase mb-2 px-2">
                {categories[category as keyof typeof categories]}
              </h3>
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50'
                        : 'text-[#B0B0B0] hover:bg-[#FFD700]/10 hover:text-[#FFD700]'
                    }`}
                    title={collapsed ? item.label : ''}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#FFD700]/10 bg-[#0A0A0A]">
        <div className="text-xs text-[#808080] text-center">
          {!collapsed && <p>v17.0.0</p>}
        </div>
      </div>
    </div>
  )
}
