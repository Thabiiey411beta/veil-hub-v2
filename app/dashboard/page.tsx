'use client'

import React, { useState, useEffect } from 'react'
import { PriceChart, VolumeChart, YieldChart, PortfolioChart } from '@/components/Charts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, StatCounter, AnimatedBadge } from '@/components/EnhancedUI'
import { generateChartData, generateVolumeData, generateYieldData, generatePortfolioData } from '@/lib/chart-data'

export default function DashboardPage() {
  const [priceData, setPriceData] = useState<any[]>([])
  const [volumeData, setVolumeData] = useState<any[]>([])
  const [yieldData, setYieldData] = useState<any[]>([])
  const [portfolioData, setPortfolioData] = useState<any[]>([])

  useEffect(() => {
    setPriceData(generateChartData(30))
    setVolumeData(generateVolumeData(30))
    setYieldData(generateYieldData(30))
    setPortfolioData(generatePortfolioData())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-[#B0B0B0]">Real-time portfolio and protocol metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <StatCounter value="$245M" label="Total Value Locked" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="18.5" label="Average APY" suffix="%" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="8.5K" label="Active Users" />
          </GradientCard>
          <GradientCard>
            <StatCounter value="52M" label="Total Burned" />
          </GradientCard>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Price Chart */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#FFD700]">📈</span> Price Trends (30d)
            </h3>
            {priceData.length > 0 && <PriceChart data={priceData} height={300} />}
          </GradientCard>

          {/* Portfolio Allocation */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#FFD700]">💼</span> Portfolio Allocation
            </h3>
            {portfolioData.length > 0 && <PortfolioChart data={portfolioData} height={300} />}
          </GradientCard>

          {/* Volume Chart */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#FFD700]">📊</span> Trading Volume (30d)
            </h3>
            {volumeData.length > 0 && <VolumeChart data={volumeData} height={300} />}
          </GradientCard>

          {/* Yield Chart */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-[#FFD700]">💰</span> Yield Performance (30d)
            </h3>
            {yieldData.length > 0 && <YieldChart data={yieldData} height={300} />}
          </GradientCard>
        </div>

        {/* Quick Actions */}
        <GradientCard>
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Deposit', icon: '📥' },
              { label: 'Borrow', icon: '💳' },
              { label: 'Withdraw', icon: '📤' },
              { label: 'Stake', icon: '🔒' },
            ].map((action, i) => (
              <button
                key={i}
                className="bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg p-4 transition-all text-center"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-sm font-semibold">{action.label}</div>
              </button>
            ))}
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="dashboard" />
      </div>
    </div>
  )
}
