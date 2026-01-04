'use client'

import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'
import { SuggestionPanel } from '@/components/SuggestionPanel'

export default function RestakingPage() {
  const [selectedPool, setSelectedPool] = useState('veil-lrt')
  const [stakeAmount, setStakeAmount] = useState('')
  const [lockDuration, setLockDuration] = useState('1year')

  const yieldData = [
    { month: 'Month 1', principal: 100, yield: 2.5, restaking: 0.8 },
    { month: 'Month 2', principal: 100, yield: 5.1, restaking: 1.8 },
    { month: 'Month 3', principal: 100, yield: 7.8, restaking: 3.2 },
    { month: 'Month 4', principal: 100, yield: 10.5, restaking: 5.1 },
    { month: 'Month 5', principal: 100, yield: 13.2, restaking: 7.5 },
    { month: 'Month 6', principal: 100, yield: 16.0, restaking: 10.2 },
  ]

  const restakingPools = [
    {
      id: 'veil-lrt',
      name: 'VEIL Liquid Restaking',
      description: 'Stake iTokens to earn additional yield',
      baseApy: '12%',
      restakingApy: '8.5%',
      totalApy: '20.5%',
      tvl: '$85M',
      slashingRisk: 'Low',
      insurance: '$50M',
      validators: 245,
      lrtToken: 'lvVEIL',
      lrtPrice: '$1.24',
    },
    {
      id: 'stable-lrt',
      name: 'Stable Restaking',
      description: 'Stake stable coins for validator rewards',
      baseApy: '8.2%',
      restakingApy: '4.5%',
      totalApy: '12.7%',
      tvl: '$120M',
      slashingRisk: 'Very Low',
      insurance: '$100M',
      validators: 512,
      lrtToken: 'lvStable',
      lrtPrice: '$1.01',
    },
    {
      id: 'defi-lrt',
      name: 'DeFi Restaking',
      description: 'Stake DeFi tokens for protocol rewards',
      baseApy: '24.3%',
      restakingApy: '12.8%',
      totalApy: '37.1%',
      tvl: '$45M',
      slashingRisk: 'Medium',
      insurance: '$25M',
      validators: 128,
      lrtToken: 'lvDeFi',
      lrtPrice: '$1.18',
    },
  ]

  const currentPool = restakingPools.find(p => p.id === selectedPool)

  const yieldTokenization = [
    {
      name: 'Principal Token (pVEIL)',
      description: 'Represents your staked principal',
      features: ['Redeemable 1:1 for VEIL', 'Tradeable on DEX', 'No yield attached'],
      price: '$1.00',
      liquidity: '$45M',
    },
    {
      name: 'Yield Token (yVEIL)',
      description: 'Represents future yield streams',
      features: ['Tradeable separately', 'Yield accrues daily', 'Can be sold/bought'],
      price: '$0.85',
      liquidity: '$28M',
    },
    {
      name: 'Restaking Token (rVEIL)',
      description: 'Represents restaking rewards',
      features: ['Validator participation', 'Slashing protection', 'Liquid staking'],
      price: '$1.12',
      liquidity: '$35M',
    },
  ]

  const restakingRewards = [
    { validator: 'Validator 1', stake: '$2.5M', rewards: '$125k', apy: '5.0%', status: 'Active' },
    { validator: 'Validator 2', stake: '$1.8M', rewards: '$98k', apy: '5.4%', status: 'Active' },
    { validator: 'Validator 3', stake: '$3.2M', rewards: '$156k', apy: '4.9%', status: 'Active' },
    { validator: 'Validator 4', stake: '$2.1M', rewards: '$112k', apy: '5.3%', status: 'Active' },
  ]

  const slashingInsurance = [
    { event: 'Double Signing', probability: '0.1%', coverage: '100%', premium: '0.5% APY' },
    { event: 'Downtime', probability: '2%', coverage: '50%', premium: '0.2% APY' },
    { event: 'Validator Slashing', probability: '0.05%', coverage: '100%', premium: '0.3% APY' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🔗 Yield Tokenization & Restaking</h1>
          <p className="text-[#B0B0B0]">Multi-layer yield stacking with liquid restaking tokens (LRTs)</p>
          <div className="mt-3">
            <AnimatedBadge variant="default">Phase 4 Feature</AnimatedBadge>
          </div>
        </div>

        {/* Pool Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {restakingPools.map(pool => (
            <button
              key={pool.id}
              onClick={() => setSelectedPool(pool.id)}
              className={`text-left transition-all ${selectedPool === pool.id ? 'ring-2 ring-[#FFD700]' : ''}`}
            >
              <GradientCard>
                <h3 className="font-bold mb-1">{pool.name}</h3>
                <p className="text-xs text-[#B0B0B0] mb-3">{pool.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold text-[#FFD700]">{pool.totalApy}</div>
                    <div className="text-xs text-[#808080]">Total APY</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#FFD700]">{pool.tvl}</div>
                    <div className="text-xs text-[#808080]">TVL</div>
                  </div>
                </div>
              </GradientCard>
            </button>
          ))}
        </div>

        {/* Pool Details */}
        {currentPool && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Yield Stacking Chart */}
            <div className="lg:col-span-2">
              <GradientCard>
                <h3 className="text-lg font-bold mb-4">6-Month Yield Stacking</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yieldData}>
                    <defs>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorRestaking" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#808080" />
                    <YAxis stroke="#808080" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }} />
                    <Legend />
                    <Area type="monotone" dataKey="principal" stackId="1" stroke="#8b5cf6" fill="url(#colorPrincipal)" />
                    <Area type="monotone" dataKey="yield" stackId="1" stroke="#FFD700" fill="url(#colorYield)" />
                    <Area type="monotone" dataKey="restaking" stackId="1" stroke="#10b981" fill="url(#colorRestaking)" />
                  </AreaChart>
                </ResponsiveContainer>
              </GradientCard>
            </div>

            {/* Pool Stats */}
            <GradientCard>
              <h3 className="text-lg font-bold mb-4">Pool Stats</h3>
              <div className="space-y-4">
                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="text-xs text-[#B0B0B0] mb-1">Base APY</div>
                  <div className="text-2xl font-bold text-[#FFD700]">{currentPool.baseApy}</div>
                </div>
                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="text-xs text-[#B0B0B0] mb-1">Restaking APY</div>
                  <div className="text-2xl font-bold text-[#10b981]">{currentPool.restakingApy}</div>
                </div>
                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="text-xs text-[#B0B0B0] mb-1">Total APY</div>
                  <div className="text-2xl font-bold text-[#FFD700]">{currentPool.totalApy}</div>
                </div>
                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="text-xs text-[#B0B0B0] mb-1">Slashing Risk</div>
                  <div className="text-sm font-bold text-[#FFD700]">{currentPool.slashingRisk}</div>
                </div>
                <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-3">
                  <div className="text-xs text-[#B0B0B0] mb-1">Insurance Pool</div>
                  <div className="text-sm font-bold text-[#10b981]">{currentPool.insurance}</div>
                </div>
              </div>
            </GradientCard>
          </div>
        )}

        {/* Staking Interface */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">📊 Stake & Earn</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staking Form */}
            <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
              <h4 className="font-bold mb-4">Stake iTokens</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Amount to Stake</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.00" 
                      className="flex-1 bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none" 
                    />
                    <button className="bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] px-4 rounded-lg transition-all">Max</button>
                  </div>
                  <div className="text-xs text-[#808080] mt-1">Balance: 125.5 iVEIL</div>
                </div>

                <div>
                  <label className="text-sm text-[#B0B0B0] mb-2 block">Lock Duration</label>
                  <select 
                    value={lockDuration}
                    onChange={(e) => setLockDuration(e.target.value)}
                    className="w-full bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none"
                  >
                    <option value="1month">1 Month (1.0x)</option>
                    <option value="3months">3 Months (1.25x)</option>
                    <option value="1year">1 Year (1.5x)</option>
                    <option value="4years">4 Years (2.0x)</option>
                  </select>
                </div>

                <div className="bg-[#1a1a2e] border border-[#FFD700]/10 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#B0B0B0]">Base Yield</span>
                    <span className="text-[#FFD700]">+{currentPool?.baseApy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#B0B0B0]">Restaking Rewards</span>
                    <span className="text-[#10b981]">+{currentPool?.restakingApy}</span>
                  </div>
                  <div className="border-t border-[#FFD700]/10 pt-2 mt-2 flex justify-between text-sm font-bold">
                    <span className="text-[#B0B0B0]">Total APY</span>
                    <span className="text-[#FFD700]">{currentPool?.totalApy}</span>
                  </div>
                </div>

                <RippleButton className="w-full">Stake & Earn</RippleButton>
              </div>
            </div>

            {/* LRT Info */}
            <div className="space-y-4">
              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
                <h4 className="font-bold mb-4">Liquid Restaking Token</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-[#B0B0B0] mb-1">Token</div>
                    <div className="text-lg font-bold text-[#FFD700]">{currentPool?.lrtToken}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#B0B0B0] mb-1">Price</div>
                    <div className="text-lg font-bold text-[#FFD700]">{currentPool?.lrtPrice}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#B0B0B0] mb-1">Validators</div>
                    <div className="text-lg font-bold text-[#FFD700]">{currentPool?.validators}</div>
                  </div>
                  <div className="bg-[#1a1a2e] border border-[#FFD700]/10 rounded-lg p-3 text-sm">
                    <p className="text-[#B0B0B0]">Receive {currentPool?.lrtToken} tokens representing your stake. Trade on DEX or hold for rewards.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
                <h4 className="font-bold mb-4">Your Stake</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#B0B0B0]">Staked</span>
                    <span className="text-[#FFD700] font-bold">0 iVEIL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B0B0B0]">Earned</span>
                    <span className="text-[#10b981] font-bold">0 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B0B0B0]">LRT Balance</span>
                    <span className="text-[#FFD700] font-bold">0 {currentPool?.lrtToken}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Yield Tokenization */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">💎 Yield Tokenization</h3>
          <p className="text-[#B0B0B0] mb-6">Separate principal from yield streams for flexible trading</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yieldTokenization.map((token, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
                <h4 className="font-bold text-[#FFD700] mb-2">{token.name}</h4>
                <p className="text-sm text-[#B0B0B0] mb-4">{token.description}</p>
                
                <div className="space-y-2 mb-4">
                  {token.features.map((feature, j) => (
                    <div key={j} className="text-sm text-[#B0B0B0] flex items-center gap-2">
                      <span className="text-[#FFD700]">✓</span> {feature}
                    </div>
                  ))}
                </div>

                <div className="bg-[#1a1a2e] border border-[#FFD700]/10 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#B0B0B0]">Price</span>
                    <span className="text-[#FFD700] font-bold">{token.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#B0B0B0]">Liquidity</span>
                    <span className="text-[#FFD700] font-bold">{token.liquidity}</span>
                  </div>
                </div>

                <RippleButton className="w-full text-sm">Trade on DEX</RippleButton>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* Validator Rewards */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">🎖️ Validator Rewards</h3>
          <p className="text-[#B0B0B0] mb-6">Earn rewards from validator participation</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/20">
                  <th className="text-left py-3 px-4 text-[#B0B0B0]">Validator</th>
                  <th className="text-right py-3 px-4 text-[#B0B0B0]">Stake</th>
                  <th className="text-right py-3 px-4 text-[#B0B0B0]">Rewards</th>
                  <th className="text-right py-3 px-4 text-[#B0B0B0]">APY</th>
                  <th className="text-center py-3 px-4 text-[#B0B0B0]">Status</th>
                </tr>
              </thead>
              <tbody>
                {restakingRewards.map((reward, i) => (
                  <tr key={i} className="border-b border-[#FFD700]/10 hover:bg-[#1a1a2e]/50 transition-all">
                    <td className="py-3 px-4 text-[#E0E0E0]">{reward.validator}</td>
                    <td className="text-right py-3 px-4 text-[#FFD700]">{reward.stake}</td>
                    <td className="text-right py-3 px-4 text-[#10b981]">{reward.rewards}</td>
                    <td className="text-right py-3 px-4 text-[#FFD700]">{reward.apy}</td>
                    <td className="text-center py-3 px-4">
                      <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-1 rounded text-xs">{reward.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* Slashing Insurance */}
        <GradientCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6">🛡️ Slashing Insurance</h3>
          <p className="text-[#B0B0B0] mb-6">Protection against validator slashing events</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {slashingInsurance.map((insurance, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-[#FFD700]/20 rounded-lg p-6">
                <h4 className="font-bold text-[#FFD700] mb-4">{insurance.event}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-[#B0B0B0] mb-1">Probability</div>
                    <div className="text-lg font-bold text-[#FFD700]">{insurance.probability}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#B0B0B0] mb-1">Coverage</div>
                    <div className="text-lg font-bold text-[#10b981]">{insurance.coverage}</div>
                  </div>
                  <div className="bg-[#1a1a2e] border border-[#FFD700]/10 rounded-lg p-3">
                    <div className="text-xs text-[#B0B0B0] mb-1">Premium</div>
                    <div className="text-sm font-bold text-[#FFD700]">{insurance.premium}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="restaking" />
      </div>
    </div>
  )
}
