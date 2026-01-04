'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { SuggestionPanel } from '@/components/SuggestionPanel'
import { GradientCard, RippleButton, AnimatedBadge } from '@/components/EnhancedUI'
import { generateChartData } from '@/lib/chart-data'

export default function DEXPage() {
  const [chartData, setChartData] = useState<any[]>([])
  const [selectedPair, setSelectedPair] = useState('BTC/USDC')
  const [tradingMode, setTradingMode] = useState<'spot' | 'futures' | 'options'>('spot')
  const [orderBook, setOrderBook] = useState<{ bids: Array<{ price: number; size: number; total: number }>; asks: Array<{ price: number; size: number; total: number }> }>({ bids: [], asks: [] })

  useEffect(() => {
    setChartData(generateChartData(30))
    setOrderBook({
      bids: [
        { price: 42840, size: 2.5, total: 106800 },
        { price: 42830, size: 1.8, total: 77094 },
        { price: 42820, size: 3.2, total: 137024 },
        { price: 42810, size: 2.1, total: 89901 },
        { price: 42800, size: 4.5, total: 192600 },
      ],
      asks: [
        { price: 42860, size: 2.3, total: 98578 },
        { price: 42870, size: 1.9, total: 81453 },
        { price: 42880, size: 3.4, total: 145792 },
        { price: 42890, size: 2.6, total: 111514 },
        { price: 42900, size: 5.1, total: 218790 },
      ],
    })
  }, [])

  const pairs = ['BTC/USDC', 'ETH/USDC', 'LINK/USDC', 'AVAX/USDC', 'VEIL/USDC']

  const futuresPositions = [
    { pair: 'BTC/USDC', side: 'Long', size: 2.5, entry: 42800, current: 42850, pnl: '+$1,250', roi: '+1.17%' },
    { pair: 'ETH/USDC', side: 'Short', size: 10, entry: 2500, current: 2450, pnl: '+$500', roi: '+2.0%' },
  ]

  const optionsContracts = [
    { pair: 'BTC/USDC', type: 'Call', strike: 45000, expiry: '7d', premium: 0.5, iv: '45%', delta: 0.65 },
    { pair: 'ETH/USDC', type: 'Put', strike: 2200, expiry: '14d', premium: 0.3, iv: '52%', delta: -0.42 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Perpetual DEX</h1>
          <p className="text-[#B0B0B0]">Spot, Futures & Options Trading with LP VACUUM</p>
        </div>

        {/* Trading Mode Tabs */}
        <div className="flex gap-2 mb-8">
          {(['spot', 'futures', 'options'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setTradingMode(mode)}
              className={`px-6 py-2 rounded-lg font-bold transition-all ${
                tradingMode === mode
                  ? 'bg-[#FFD700] text-[#0A0A0A]'
                  : 'bg-[#333] text-[#E0E0E0] hover:bg-[#444]'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <GradientCard>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-4">Price Chart</h3>
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {pairs.map(pair => (
                    <button
                      key={pair}
                      onClick={() => setSelectedPair(pair)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                        selectedPair === pair
                          ? 'bg-[#FFD700] text-[#0A0A0A] font-bold'
                          : 'bg-[#333] text-[#E0E0E0] hover:bg-[#444]'
                      }`}
                    >
                      {pair}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#808080" />
                  <YAxis stroke="#808080" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
                    labelStyle={{ color: '#FFD700' }}
                  />
                  <Line type="monotone" dataKey="BTC" stroke="#FFD700" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GradientCard>
          </div>

          {/* Trading Panel */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">
              {tradingMode === 'spot' && '💱 Quick Swap'}
              {tradingMode === 'futures' && '📈 Open Position'}
              {tradingMode === 'options' && '📊 Buy Option'}
            </h3>
            <div className="space-y-4">
              {tradingMode === 'spot' && (
                <>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">From</label>
                    <input type="number" placeholder="0.00" className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]" />
                    <select className="w-full mt-2 bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0]">
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>USDC</option>
                    </select>
                  </div>
                  <button className="w-full bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-lg p-2 text-[#FFD700] hover:bg-[#FFD700]/30 transition-all">⇅ Swap</button>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">To</label>
                    <input type="number" placeholder="0.00" className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]" />
                    <select className="w-full mt-2 bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0]">
                      <option>USDC</option>
                      <option>ETH</option>
                      <option>BTC</option>
                    </select>
                  </div>
                  <RippleButton className="w-full">Execute Swap</RippleButton>
                </>
              )}

              {tradingMode === 'futures' && (
                <>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Position Size</label>
                    <input type="number" placeholder="0.00" className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]" />
                  </div>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Leverage</label>
                    <select className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0]">
                      <option>1x</option>
                      <option>2x</option>
                      <option>5x</option>
                      <option>10x</option>
                      <option>20x</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <RippleButton className="flex-1 bg-[#10b981]/20 border border-[#10b981] text-[#10b981]">Long</RippleButton>
                    <RippleButton className="flex-1 bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]">Short</RippleButton>
                  </div>
                </>
              )}

              {tradingMode === 'options' && (
                <>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Strike Price</label>
                    <input type="number" placeholder="0.00" className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0] placeholder-[#666] focus:outline-none focus:border-[#FFD700]" />
                  </div>
                  <div>
                    <label className="text-sm text-[#B0B0B0] mb-2 block">Expiry</label>
                    <select className="w-full bg-[#0A0A0A] border border-[#FFD700]/30 rounded-lg p-3 text-[#E0E0E0]">
                      <option>7 Days</option>
                      <option>14 Days</option>
                      <option>30 Days</option>
                      <option>90 Days</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <RippleButton className="flex-1 bg-[#10b981]/20 border border-[#10b981] text-[#10b981]">Call</RippleButton>
                    <RippleButton className="flex-1 bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]">Put</RippleButton>
                  </div>
                </>
              )}
            </div>
          </GradientCard>
        </div>

        {/* Futures Positions */}
        {tradingMode === 'futures' && (
          <GradientCard className="mb-8">
            <h3 className="text-lg font-bold mb-4">📈 Open Positions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#FFD700]/10">
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Pair</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Side</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Size</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Entry</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Current</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">P&L</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {futuresPositions.map((pos, i) => (
                    <tr key={i} className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                      <td className="py-3 px-4 font-semibold">{pos.pair}</td>
                      <td className={`py-3 px-4 font-bold ${pos.side === 'Long' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{pos.side}</td>
                      <td className="py-3 px-4">{pos.size}</td>
                      <td className="py-3 px-4 text-[#B0B0B0]">${pos.entry.toLocaleString()}</td>
                      <td className="py-3 px-4 text-[#FFD700]">${pos.current.toLocaleString()}</td>
                      <td className="py-3 px-4 text-[#10b981] font-bold">{pos.pnl}</td>
                      <td className="py-3 px-4 text-[#10b981] font-bold">{pos.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GradientCard>
        )}

        {/* Options Contracts */}
        {tradingMode === 'options' && (
          <GradientCard className="mb-8">
            <h3 className="text-lg font-bold mb-4">📊 Available Options</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#FFD700]/10">
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Pair</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Type</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Strike</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Expiry</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Premium</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">IV</th>
                    <th className="text-left py-3 px-4 text-[#B0B0B0]">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsContracts.map((opt, i) => (
                    <tr key={i} className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                      <td className="py-3 px-4 font-semibold">{opt.pair}</td>
                      <td className={`py-3 px-4 font-bold ${opt.type === 'Call' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{opt.type}</td>
                      <td className="py-3 px-4 text-[#FFD700]">${opt.strike.toLocaleString()}</td>
                      <td className="py-3 px-4 text-[#B0B0B0]">{opt.expiry}</td>
                      <td className="py-3 px-4 text-[#FFD700]">{opt.premium}</td>
                      <td className="py-3 px-4 text-[#8b5cf6]">{opt.iv}</td>
                      <td className="py-3 px-4 text-[#06b6d4]">{opt.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GradientCard>
        )}

        {/* Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <GradientCard>
            <h3 className="text-lg font-bold mb-4 text-[#10b981]">Buy Orders (Bids)</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 text-xs text-[#B0B0B0] mb-3 pb-3 border-b border-[#FFD700]/10">
                <div>Price</div>
                <div>Size</div>
                <div>Total</div>
              </div>
              {orderBook.bids.map((bid, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 text-sm hover:bg-[#FFD700]/5 p-2 rounded transition-all">
                  <div className="text-[#10b981]">${bid.price.toLocaleString()}</div>
                  <div className="text-[#E0E0E0]">{bid.size} BTC</div>
                  <div className="text-[#FFD700]">${bid.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </GradientCard>

          <GradientCard>
            <h3 className="text-lg font-bold mb-4 text-[#ef4444]">Sell Orders (Asks)</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4 text-xs text-[#B0B0B0] mb-3 pb-3 border-b border-[#FFD700]/10">
                <div>Price</div>
                <div>Size</div>
                <div>Total</div>
              </div>
              {orderBook.asks.map((ask, i) => (
                <div key={i} className="grid grid-cols-3 gap-4 text-sm hover:bg-[#FFD700]/5 p-2 rounded transition-all">
                  <div className="text-[#ef4444]">${ask.price.toLocaleString()}</div>
                  <div className="text-[#E0E0E0]">{ask.size} BTC</div>
                  <div className="text-[#FFD700]">${ask.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* Recent Trades */}
        <GradientCard className="mb-8">
          <h3 className="text-lg font-bold mb-4">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#FFD700]/10">
                  <th className="text-left py-2 px-4 text-[#B0B0B0]">Time</th>
                  <th className="text-left py-2 px-4 text-[#B0B0B0]">Price</th>
                  <th className="text-left py-2 px-4 text-[#B0B0B0]">Size</th>
                  <th className="text-left py-2 px-4 text-[#B0B0B0]">Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '14:32:45', price: 42850, size: 2.5, type: 'Buy' },
                  { time: '14:31:22', price: 42845, size: 1.8, type: 'Sell' },
                  { time: '14:30:15', price: 42855, size: 3.2, type: 'Buy' },
                  { time: '14:29:08', price: 42840, size: 2.1, type: 'Sell' },
                ].map((trade, i) => (
                  <tr key={i} className="border-b border-[#FFD700]/5 hover:bg-[#FFD700]/5">
                    <td className="py-2 px-4 text-[#B0B0B0]">{trade.time}</td>
                    <td className="py-2 px-4 text-[#FFD700]">${trade.price.toLocaleString()}</td>
                    <td className="py-2 px-4 text-[#E0E0E0]">{trade.size} BTC</td>
                    <td className={`py-2 px-4 font-semibold ${trade.type === 'Buy' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {trade.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GradientCard>

        {/* AI Suggestion Panel */}
        <SuggestionPanel page="dex" />
      </div>
    </div>
  )
}
