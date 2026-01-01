'use client';

import { useState } from 'react';

export default function PerpetualDEX() {
  const [selectedPair, setSelectedPair] = useState('BTC/USDC');
  const [orderType, setOrderType] = useState('limit');
  const [lpVacuumActive, setLpVacuumActive] = useState(true);

  const pairs = [
    { symbol: 'BTC/USDC', price: 42850, change: '+2.5%', volume: '$1.2B' },
    { symbol: 'ETH/USDC', price: 2450, change: '+1.8%', volume: '$850M' },
    { symbol: 'LINK/USDC', price: 18.50, change: '+3.2%', volume: '$320M' },
    { symbol: 'AVAX/USDC', price: 35.20, change: '+1.1%', volume: '$180M' },
  ];

  const orderBook = {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] text-[#E0E0E0] font-['Inter']">
      {/* Header */}
      <div className="border-b border-[#FFD700]/10 px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-[#FFD700]">◆</span> Perpetual DEX
          </h1>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${lpVacuumActive ? 'bg-[#FFD700]/20 border border-[#FFD700]' : 'bg-[#808080]/20 border border-[#808080]'}`}>
            <div className={`w-2 h-2 rounded-full ${lpVacuumActive ? 'bg-[#FFD700] animate-pulse' : 'bg-[#808080]'}`} />
            <span className="text-sm font-bold">LP VACUUM {lpVacuumActive ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Trading Pairs */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all h-fit">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Trading Pairs
            </h3>
            <div className="space-y-2">
              {pairs.map((pair) => (
                <button
                  key={pair.symbol}
                  onClick={() => setSelectedPair(pair.symbol)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPair === pair.symbol
                      ? 'bg-[#FFD700]/20 border border-[#FFD700]'
                      : 'border border-[#FFD700]/10 hover:border-[#FFD700]/30'
                  }`}
                >
                  <div className="font-semibold text-sm">{pair.symbol}</div>
                  <div className="flex justify-between text-xs text-[#808080] mt-1">
                    <span>${pair.price}</span>
                    <span className="text-[#FFD700]">{pair.change}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center - Chart & Order Book */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <span className="text-[#FFD700]">◆</span> {selectedPair} Chart
              </h3>
              <div className="h-64 flex items-end justify-between gap-1">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#FFD700]/40 to-[#FFD700]/10 rounded-t hover:from-[#FFD700]/60 hover:to-[#FFD700]/30 transition-all"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-[#808080] mt-4">
                <span>1H</span>
                <span>4H</span>
                <span>1D</span>
                <span>1W</span>
              </div>
            </div>

            {/* Order Book */}
            <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-[#FFD700]">◆</span> Order Book
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Bids */}
                <div>
                  <div className="text-xs text-[#808080] mb-3 font-bold">BIDS</div>
                  <div className="space-y-1">
                    {orderBook.bids.map((bid, i) => (
                      <div key={i} className="flex justify-between text-xs p-2 hover:bg-[#FFD700]/5 rounded transition-all">
                        <span className="text-[#FFD700]">${bid.price}</span>
                        <span>{bid.size}</span>
                        <span className="text-[#808080]">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asks */}
                <div>
                  <div className="text-xs text-[#808080] mb-3 font-bold">ASKS</div>
                  <div className="space-y-1">
                    {orderBook.asks.map((ask, i) => (
                      <div key={i} className="flex justify-between text-xs p-2 hover:bg-[#FFD700]/5 rounded transition-all">
                        <span className="text-[#FFD700]">${ask.price}</span>
                        <span>{ask.size}</span>
                        <span className="text-[#808080]">{ask.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Order Form */}
          <div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all h-fit">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> Place Order
            </h3>

            {/* Order Type Tabs */}
            <div className="flex gap-2 mb-6 bg-[#FFD700]/5 p-1 rounded-lg">
              {['limit', 'market'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-2 rounded transition-all text-sm font-bold ${
                    orderType === type
                      ? 'bg-[#FFD700] text-[#0A0A0A]'
                      : 'text-[#808080] hover:text-[#E0E0E0]'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs text-[#808080] mb-2 block">Price</label>
                <input
                  type="number"
                  placeholder="42850"
                  className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg px-4 py-2 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-[#808080] mb-2 block">Amount</label>
                <input
                  type="number"
                  placeholder="0.5"
                  className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg px-4 py-2 text-[#E0E0E0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-[#808080] mb-2 block">Leverage</label>
                <select className="w-full bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg px-4 py-2 text-[#E0E0E0] focus:border-[#FFD700] focus:outline-none transition-all">
                  <option>1x</option>
                  <option>2x</option>
                  <option>5x</option>
                  <option>10x</option>
                </select>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#808080]">Total:</span>
                <span className="text-[#FFD700] font-bold">$21,425</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#808080]">Fee:</span>
                <span className="text-[#FFD700]">$64.28</span>
              </div>
              <div className="border-t border-[#FFD700]/20 pt-2 flex justify-between">
                <span className="text-[#808080]">Est. Liquidation:</span>
                <span className="text-[#FFD700]">$38,500</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-3 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#FFF700] transition-all">
                Buy
              </button>
              <button className="w-full py-3 border border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 transition-all">
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* LP VACUUM Info */}
        <div className="mt-8 border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 transition-all">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-[#FFD700]">◆</span> LP VACUUM Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Encrypted Execution', value: 'ACTIVE', status: 'success' },
              { label: 'Slippage Protection', value: '0.05%', status: 'success' },
              { label: 'MEV Resistance', value: 'ENABLED', status: 'success' },
              { label: 'Privacy Level', value: 'MAXIMUM', status: 'success' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-[#808080] text-xs mb-2">{item.label}</div>
                <div className="text-[#FFD700] font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
