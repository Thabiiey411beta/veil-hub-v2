'use client'

import React, { useState } from 'react'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'

export default function BorrowPage() {
  const [borrowAmount, setBorrowAmount] = useState('')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [selectedCollateral, setSelectedCollateral] = useState('VEIL')
  const [borrowDuration, setBorrowDuration] = useState('6')

  const collateralRatio = collateralAmount && borrowAmount 
    ? parseFloat((parseFloat(collateralAmount) / parseFloat(borrowAmount) * 100).toFixed(1))
    : 0

  const borrowingStats = [
    { label: 'Fixed APR', value: '5.5%', color: '#FFD700' },
    { label: 'Min Collateral', value: '180%', color: '#10b981' },
    { label: 'Auto-Repay Trigger', value: '120%', color: '#ef4444' },
    { label: 'Max Borrow', value: '$500K', color: '#8b5cf6' },
  ]

  const collateralOptions = [
    { symbol: 'VEIL', price: 0.85, balance: 50000 },
    { symbol: 'BTC', price: 42850, balance: 2.5 },
    { symbol: 'ETH', price: 2450, balance: 15 },
    { symbol: 'LINK', price: 18.50, balance: 500 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Zero-Liquidation Borrowing</h1>
          <p className="text-[#B0B0B0]">Borrow USDC at 5.5% fixed APR with no liquidation risk</p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {borrowingStats.map((stat, i) => (
            <GradientCard key={i}>
              <div className="text-sm text-[#B0B0B0] mb-2">{stat.label}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </GradientCard>
          ))}
        </div>

        {/* Borrow Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Borrow Form */}
          <div className="lg:col-span-2">
            <GradientCard>
              <h3 className="text-lg font-bold mb-6">Borrow USDC</h3>

              {/* Collateral Selection */}
              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-3 block">Select Collateral</label>
                <div className="grid grid-cols-2 gap-3">
                  {collateralOptions.map(option => (
                    <button
                      key={option.symbol}
                      onClick={() => setSelectedCollateral(option.symbol)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedCollateral === option.symbol
                          ? 'bg-[#FFD700]/20 border-[#FFD700]'
                          : 'bg-[#0A0A0A] border-[#FFD700]/20 hover:border-[#FFD700]/50'
                      }`}
                    >
                      <div className="font-semibold">{option.symbol}</div>
                      <div className="text-xs text-[#B0B0B0]">${option.price.toLocaleString()}</div>
                      <div className="text-xs text-[#808080]">Balance: {option.balance}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collateral Amount */}
              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-2 block">Collateral Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-4 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]"
                  />
                  <span className="absolute right-4 top-4 text-[#B0B0B0]">{selectedCollateral}</span>
                </div>
              </div>

              {/* Borrow Amount */}
              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-2 block">Borrow Amount (USDC)</label>
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-4 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-2 block">Loan Duration</label>
                <select
                  value={borrowDuration}
                  onChange={(e) => setBorrowDuration(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-4 text-[#E0E0E0] focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                </select>
              </div>

              {/* Borrow Button */}
              <RippleButton className="w-full">
                Initiate Borrow
              </RippleButton>
            </GradientCard>
          </div>

          {/* Summary */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-6">Loan Summary</h3>
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">Collateral Ratio</div>
                <div className="text-2xl font-bold text-[#FFD700]">{collateralRatio}%</div>
                <div className="text-xs text-[#808080] mt-2">
                  {collateralRatio >= 180 ? '✓ Safe' : '⚠ Below minimum'}
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">Interest Cost</div>
                <div className="text-2xl font-bold text-[#FFD700]">
                  ${borrowAmount ? (parseFloat(borrowAmount) * 0.055 * parseInt(borrowDuration) / 12).toFixed(2) : '0.00'}
                </div>
                <div className="text-xs text-[#808080] mt-2">5.5% APR</div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">Total Repay</div>
                <div className="text-2xl font-bold text-[#FFD700]">
                  ${borrowAmount ? (parseFloat(borrowAmount) + (parseFloat(borrowAmount) * 0.055 * parseInt(borrowDuration) / 12)).toFixed(2) : '0.00'}
                </div>
                <div className="text-xs text-[#808080] mt-2">Principal + Interest</div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4">
                <div className="text-sm text-[#B0B0B0] mb-1">Auto-Repay Trigger</div>
                <div className="text-lg font-bold text-[#ef4444]">120% Ratio</div>
                <div className="text-xs text-[#808080] mt-2">Automatic repayment</div>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Active Loans */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Your Active Loans</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/10">
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Collateral</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Amount</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Ratio</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Interest Paid</th>
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                  <td className="py-3 px-4">VEIL</td>
                  <td className="py-3 px-4">$50,000</td>
                  <td className="py-3 px-4 text-[#10b981]">195%</td>
                  <td className="py-3 px-4">$2,750</td>
                  <td className="py-3 px-4"><AnimatedBadge variant="success">Active</AnimatedBadge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="borrow" />
      </div>
    </div>
  )
}
