import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Clock, DollarSign, Percent, Zap, Target, AlertTriangle, Activity, BarChart3, Layers } from 'lucide-react';

const AdvancedTradingInterface = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USD');
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('long');
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  // Mock market data
  const pairs = [
    { symbol: 'BTC/USD', price: 42567.89, change: 2.34, volume: '1.2B', fundingRate: 0.0123 },
    { symbol: 'ETH/USD', price: 2234.56, change: -1.23, volume: '890M', fundingRate: 0.0098 },
    { symbol: 'SOL/USD', price: 98.76, change: 5.67, volume: '234M', fundingRate: 0.0156 },
    { symbol: 'AVAX/USD', price: 34.21, change: -0.89, volume: '123M', fundingRate: 0.0087 }
  ];

  const currentPair = pairs.find(p => p.symbol === selectedPair) || pairs[0];

  // Generate mock orderbook data
  const generateOrderBook = () => {
    const basePrice = currentPair.price;
    const asks = Array.from({ length: 15 }, (_, i) => ({
      price: basePrice + (i + 1) * (basePrice * 0.0001),
      amount: Math.random() * 10,
      total: Math.random() * 100000
    }));
    const bids = Array.from({ length: 15 }, (_, i) => ({
      price: basePrice - (i + 1) * (basePrice * 0.0001),
      amount: Math.random() * 10,
      total: Math.random() * 100000
    }));
    return { asks, bids };
  };

  const orderBook = generateOrderBook();

  // Generate mock chart data
  const chartData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    price: currentPair.price + (Math.random() - 0.5) * 1000,
    volume: Math.random() * 50000000
  }));

  // Mock open positions
  const [positions, setPositions] = useState([
    { id: 1, pair: 'BTC/USD', side: 'long', size: 0.5, entryPrice: 41234, leverage: 10, pnl: 1245.67, pnlPercent: 3.02 },
    { id: 2, pair: 'ETH/USD', side: 'short', size: 5, entryPrice: 2345, leverage: 5, pnl: -123.45, pnlPercent: -1.05 }
  ]);

  // Calculate liquidation price
  const calculateLiquidation = () => {
    if (!amount || !price) return 'N/A';
    const entryPrice = parseFloat(price);
    const liquidationPercent = (1 / leverage) * 0.9; // 90% of margin
    if (side === 'long') {
      return (entryPrice * (1 - liquidationPercent)).toFixed(2);
    } else {
      return (entryPrice * (1 + liquidationPercent)).toFixed(2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-4">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Perpetual Trading
              </h1>
              <p className="text-slate-400 text-sm">Up to 50x leverage • 5bps fees</p>
            </div>
          </div>
          
          {/* Pair Selector */}
          <div className="flex gap-2">
            {pairs.map((pair) => (
              <button
                key={pair.symbol}
                onClick={() => setSelectedPair(pair.symbol)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedPair === pair.symbol
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                }`}
              >
                <div className="text-sm font-bold">{pair.symbol}</div>
                <div className={`text-xs ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {pair.change >= 0 ? '+' : ''}{pair.change}%
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar - Order Book */}
          <div className="col-span-3 space-y-4">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Order Book
              </h3>
              
              {/* Asks */}
              <div className="space-y-1 mb-2">
                {orderBook.asks.slice().reverse().slice(0, 8).map((ask, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="text-red-400">{ask.price.toFixed(2)}</span>
                    <span className="text-slate-400 text-right">{ask.amount.toFixed(4)}</span>
                    <span className="text-slate-500 text-right">${(ask.total / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>

              {/* Spread */}
              <div className="py-2 my-2 border-y border-slate-700 text-center">
                <div className="text-lg font-bold text-violet-400">{currentPair.price.toFixed(2)}</div>
                <div className="text-xs text-slate-400">Spread: 0.05%</div>
              </div>

              {/* Bids */}
              <div className="space-y-1">
                {orderBook.bids.slice(0, 8).map((bid, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 text-xs">
                    <span className="text-green-400">{bid.price.toFixed(2)}</span>
                    <span className="text-slate-400 text-right">{bid.amount.toFixed(4)}</span>
                    <span className="text-slate-500 text-right">${(bid.total / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent Trades
              </h3>
              <div className="space-y-1">
                {Array.from({ length: 10 }, (_, i) => ({
                  price: currentPair.price + (Math.random() - 0.5) * 100,
                  amount: Math.random() * 2,
                  time: `${Math.floor(Math.random() * 60)}s`,
                  side: Math.random() > 0.5 ? 'buy' : 'sell'
                })).map((trade, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 text-xs">
                    <span className={trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}>
                      {trade.price.toFixed(2)}
                    </span>
                    <span className="text-slate-400 text-right">{trade.amount.toFixed(4)}</span>
                    <span className="text-slate-500 text-right">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Chart & Trading Panel */}
          <div className="col-span-6 space-y-4">
            {/* Market Info Bar */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: '24h Volume', value: currentPair.volume, icon: Activity },
                { label: 'Funding Rate', value: `${currentPair.fundingRate}%`, icon: Percent },
                { label: 'Open Interest', value: '$124M', icon: DollarSign },
                { label: 'Next Funding', value: '2h 34m', icon: Clock }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                      <Icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                    <div className="text-sm font-bold">{stat.value}</div>
                  </div>
                );
              })}
            </div>

            {/* Price Chart */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold">${currentPair.price.toLocaleString()}</div>
                    <div className={`text-sm flex items-center gap-1 ${currentPair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currentPair.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {currentPair.change >= 0 ? '+' : ''}{currentPair.change}%
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
                    <button key={tf} className="px-3 py-1 text-xs rounded bg-slate-800/50 hover:bg-slate-700/50">
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" hide />
                  <YAxis stroke="#64748b" domain={['dataMin - 500', 'dataMax + 500']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: any) => (value != null ? [`$${Number(value).toFixed(2)}`, 'Price'] : ['', 'Price'])}
                  />
                  <Area type="monotone" dataKey="price" stroke="#8b5cf6" fill="url(#priceGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Sidebar - Trading Panel */}
          <div className="col-span-3 space-y-4">
            {/* Order Entry */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
              {/* Long/Short Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setSide('long')}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    side === 'long'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-slate-800/50 text-slate-400'
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setSide('short')}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    side === 'short'
                      ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                      : 'bg-slate-800/50 text-slate-400'
                  }`}
                >
                  Short
                </button>
              </div>

              {/* Order Type */}
              <div className="flex gap-2 mb-4">
                {['market', 'limit', 'stop'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-2 rounded text-sm capitalize transition-all ${
                      orderType === type
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                        : 'bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Leverage Slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Leverage</span>
                  <span className="text-sm font-bold text-violet-400">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1x</span>
                  <span>25x</span>
                  <span>50x</span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-3">
                <label className="text-xs text-slate-400 mb-1 block">Amount ({selectedPair.split('/')[0]})</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                />
              </div>

              {/* Price Input (if limit/stop) */}
              {orderType !== 'market' && (
                <div className="mb-3">
                  <label className="text-xs text-slate-400 mb-1 block">Price (USD)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={currentPair.price.toFixed(2)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
                  />
                </div>
              )}

              {/* Advanced Options */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Stop Loss</label>
                  <input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Take Profit</label>
                  <input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    placeholder="Optional"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Position Info */}
              <div className="bg-slate-800/50 rounded-lg p-3 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Entry Price</span>
                  <span className="font-bold">${orderType === 'market' ? currentPair.price.toFixed(2) : (price ? Number(price).toFixed(2) : currentPair.price.toFixed(2))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Liquidation</span>
                  <span className="font-bold text-red-400">${calculateLiquidation()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Fee</span>
                  <span className="font-bold">0.05%</span>
                </div>
              </div>

              {/* Submit Button */}
              <button className={`w-full py-3 rounded-lg font-bold transition-all ${
                side === 'long'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
              }`}>
                Open {side === 'long' ? 'Long' : 'Short'} Position
              </button>

              <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                <AlertTriangle className="w-3 h-3" />
                <span>High leverage increases risk</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
              <h3 className="text-sm font-bold mb-3">Account Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Balance</span>
                  <span className="font-bold">$10,234.56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available</span>
                  <span className="font-bold text-green-400">$8,123.45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Used Margin</span>
                  <span className="font-bold text-orange-400">$2,111.11</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unrealized PnL</span>
                  <span className="font-bold text-green-400">+$1,122.22</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-4 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-800">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Open Positions
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="text-left pb-2">Pair</th>
                  <th className="text-left pb-2">Side</th>
                  <th className="text-right pb-2">Size</th>
                  <th className="text-right pb-2">Entry Price</th>
                  <th className="text-right pb-2">Mark Price</th>
                  <th className="text-right pb-2">Liq. Price</th>
                  <th className="text-right pb-2">Leverage</th>
                  <th className="text-right pb-2">PnL</th>
                  <th className="text-right pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => (
                  <tr key={pos.id} className="border-b border-slate-800">
                    <td className="py-3 font-medium">{pos.pair}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        pos.side === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {pos.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">{pos.size}</td>
                    <td className="py-3 text-right">${pos.entryPrice.toLocaleString()}</td>
                    <td className="py-3 text-right">${(pos.entryPrice * 1.03).toLocaleString()}</td>
                    <td className="py-3 text-right text-red-400">${(pos.entryPrice * 0.92).toLocaleString()}</td>
                    <td className="py-3 text-right">{pos.leverage}x</td>
                    <td className="py-3 text-right">
                      <div className={pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                      </div>
                      <div className={`text-xs ${pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ({pos.pnlPercent >= 0 ? '+' : ''}{pos.pnlPercent}%)
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs font-medium">
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTradingInterface;
