'use client'

import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'

export default function GovernancePage() {
  const [lockAmount, setLockAmount] = useState('')
  const [lockDuration, setLockDuration] = useState('52')
  const [selectedProposal, setSelectedProposal] = useState(0)

  const votingPowerData = [
    { duration: '1 Week', boost: '1.0x', power: 100 },
    { duration: '1 Month', boost: '1.25x', power: 125 },
    { duration: '3 Months', boost: '1.5x', power: 150 },
    { duration: '1 Year', boost: '2.0x', power: 200 },
    { duration: '4 Years', boost: '2.5x', power: 250 },
  ]

  const proposals = [
    {
      id: 1,
      title: 'Increase Immortal Reserve APY to 20%',
      description: 'Proposal to increase yield for long-term holders',
      status: 'Active',
      votesFor: 8500,
      votesAgainst: 1200,
      votesAbstain: 300,
      endDate: '2024-02-15',
      quorum: 85,
    },
    {
      id: 2,
      title: 'Launch New Aggressive Vault Strategy',
      description: 'Deploy perpetual trading strategy with 25% target APY',
      status: 'Active',
      votesFor: 6200,
      votesAgainst: 2100,
      votesAbstain: 500,
      endDate: '2024-02-18',
      quorum: 72,
    },
    {
      id: 3,
      title: 'Reduce Borrow APR to 5.0%',
      description: 'Competitive rate adjustment for borrowers',
      status: 'Pending',
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      endDate: '2024-02-20',
      quorum: 0,
    },
  ]

  const treasuryData = [
    { name: 'USDC', value: 50000000, color: '#10b981' },
    { name: 'VEIL', value: 200000000, color: '#FFD700' },
    { name: 'BTC', value: 15000000, color: '#f59e0b' },
    { name: 'ETH', value: 35000000, color: '#8b5cf6' },
  ]

  const currentProposal = proposals[selectedProposal]
  const totalVotes = currentProposal.votesFor + currentProposal.votesAgainst + currentProposal.votesAbstain
  const forPercentage = totalVotes > 0 ? (currentProposal.votesFor / totalVotes * 100).toFixed(1) : 0
  const againstPercentage = totalVotes > 0 ? (currentProposal.votesAgainst / totalVotes * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Governance</h1>
          <p className="text-[#B0B0B0]">veVEIL voting and DAO treasury management</p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Total veVEIL</div>
            <div className="text-2xl font-bold text-[#FFD700]">450M</div>
            <div className="text-xs text-[#808080] mt-2">Locked VEIL</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Your veVEIL</div>
            <div className="text-2xl font-bold text-[#FFD700]">2.5M</div>
            <div className="text-xs text-[#808080] mt-2">Voting Power</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Active Proposals</div>
            <div className="text-2xl font-bold text-[#FFD700]">2</div>
            <div className="text-xs text-[#808080] mt-2">Voting Now</div>
          </GradientCard>
          <GradientCard>
            <div className="text-sm text-[#B0B0B0] mb-2">Treasury Value</div>
            <div className="text-2xl font-bold text-[#FFD700]">$300M</div>
            <div className="text-xs text-[#808080] mt-2">DAO Assets</div>
          </GradientCard>
        </div>

        {/* Lock VEIL Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lock Form */}
          <div className="lg:col-span-2">
            <GradientCard>
              <h3 className="text-lg font-bold mb-6">Lock VEIL for veVEIL</h3>

              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-2 block">VEIL Amount</label>
                <input
                  type="number"
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-4 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm text-[#B0B0B0] mb-2 block">Lock Duration</label>
                <select
                  value={lockDuration}
                  onChange={(e) => setLockDuration(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-4 text-[#E0E0E0] focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="1">1 Week (1.0x)</option>
                  <option value="4">1 Month (1.25x)</option>
                  <option value="13">3 Months (1.5x)</option>
                  <option value="52">1 Year (2.0x)</option>
                  <option value="208">4 Years (2.5x)</option>
                </select>
              </div>

              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[#B0B0B0]">veVEIL You'll Receive</span>
                  <span className="text-[#FFD700] font-bold">
                    {lockAmount ? (parseFloat(lockAmount) * (lockDuration === '1' ? 1 : lockDuration === '4' ? 1.25 : lockDuration === '13' ? 1.5 : lockDuration === '52' ? 2 : 2.5)).toFixed(0) : '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B0B0B0]">Yield Boost</span>
                  <span className="text-[#FFD700]">
                    {lockDuration === '1' ? '1.0x' : lockDuration === '4' ? '1.25x' : lockDuration === '13' ? '1.5x' : lockDuration === '52' ? '2.0x' : '2.5x'}
                  </span>
                </div>
              </div>

              <RippleButton className="w-full">
                Lock VEIL
              </RippleButton>
            </GradientCard>
          </div>

          {/* Voting Power Chart */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Voting Power by Duration</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={votingPowerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="duration" stroke="#808080" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#808080" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                  labelStyle={{ color: '#FFD700' }}
                />
                <Bar dataKey="power" fill="#FFD700" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </GradientCard>
        </div>

        {/* Proposals */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Active Proposals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {proposals.map((proposal, i) => (
              <button
                key={proposal.id}
                onClick={() => setSelectedProposal(i)}
                className={`text-left transition-all ${selectedProposal === i ? 'ring-2 ring-[#FFD700]' : ''}`}
              >
                <GradientCard>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm flex-1">{proposal.title}</h4>
                    <AnimatedBadge variant={proposal.status === 'Active' ? 'success' : 'default'}>
                      {proposal.status}
                    </AnimatedBadge>
                  </div>
                  <p className="text-xs text-[#B0B0B0] mb-3">{proposal.description}</p>
                  <div className="text-xs text-[#808080]">
                    Ends: {proposal.endDate}
                  </div>
                </GradientCard>
              </button>
            ))}
          </div>
        </div>

        {/* Proposal Details */}
        {currentProposal && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Voting Results */}
            <div className="lg:col-span-2">
              <GradientCard>
                <h3 className="text-lg font-bold mb-4">Voting Results</h3>
                <div className="space-y-4">
                  {/* For */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#10b981] font-semibold">For</span>
                      <span className="text-[#10b981]">{forPercentage}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-3">
                      <div
                        className="bg-[#10b981] h-3 rounded-full transition-all"
                        style={{ width: `${forPercentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-[#B0B0B0] mt-1">{currentProposal.votesFor.toLocaleString()} votes</div>
                  </div>

                  {/* Against */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#ef4444] font-semibold">Against</span>
                      <span className="text-[#ef4444]">{againstPercentage}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-3">
                      <div
                        className="bg-[#ef4444] h-3 rounded-full transition-all"
                        style={{ width: `${againstPercentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-[#B0B0B0] mt-1">{currentProposal.votesAgainst.toLocaleString()} votes</div>
                  </div>

                  {/* Abstain */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#8b5cf6] font-semibold">Abstain</span>
                      <span className="text-[#8b5cf6]">{((currentProposal.votesAbstain / totalVotes * 100) || 0).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-[#333] rounded-full h-3">
                      <div
                        className="bg-[#8b5cf6] h-3 rounded-full transition-all"
                        style={{ width: `${(currentProposal.votesAbstain / totalVotes * 100) || 0}%` }}
                      />
                    </div>
                    <div className="text-xs text-[#B0B0B0] mt-1">{currentProposal.votesAbstain.toLocaleString()} votes</div>
                  </div>
                </div>
              </GradientCard>
            </div>

            {/* Vote */}
            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Cast Your Vote</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#10b981]/20 border border-[#10b981]/50 rounded-lg p-3 text-[#10b981] hover:bg-[#10b981]/30 transition-all font-semibold">
                  ✓ Vote For
                </button>
                <button className="w-full bg-[#ef4444]/20 border border-[#ef4444]/50 rounded-lg p-3 text-[#ef4444] hover:bg-[#ef4444]/30 transition-all font-semibold">
                  ✗ Vote Against
                </button>
                <button className="w-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/50 rounded-lg p-3 text-[#8b5cf6] hover:bg-[#8b5cf6]/30 transition-all font-semibold">
                  ◯ Abstain
                </button>
              </div>
              <div className="mt-4 bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3 text-sm">
                <div className="text-[#B0B0B0] mb-1">Your Voting Power</div>
                <div className="text-lg font-bold text-[#FFD700]">2.5M veVEIL</div>
              </div>
            </GradientCard>
          </div>
        )}

        {/* Treasury */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">DAO Treasury</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={treasuryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(0)}M`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {treasuryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                    labelStyle={{ color: '#FFD700' }}
                    formatter={(value: any) => `$${(value / 1000000).toFixed(2)}M`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {treasuryData.map((asset, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                    <span className="text-sm">{asset.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#FFD700]">${(asset.value / 1000000).toFixed(0)}M</div>
                    <div className="text-xs text-[#B0B0B0]">{((asset.value / 300000000) * 100).toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="governance" />
      </div>
    </div>
  )
}
