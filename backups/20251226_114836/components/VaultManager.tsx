import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { Target, TrendingUp, Shield, Zap, DollarSign, Percent, Activity, AlertTriangle, Clock, Layers, ArrowUpRight, ArrowDownRight, Info, ChevronDown } from 'lucide-react';

const VaultManager = () => {
  const [selectedVault, setSelectedVault] = useState<any | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  // Vault Data
  const vaults: any[] = [
    {
      id: 1,
      name: 'BTC/ETH Alpha',
      strategy: 'Concentrated Liquidity + Delta Neutral',
      tvl: 45000000,
      apy: 42.3,
      risk: 'medium',
      performance30d: 12.4,
      sharpe: 2.18,
      maxDrawdown: -8.3,
      assets: ['BTC', 'ETH', 'USDC'],
      allocation: { BTC: 40, ETH: 40, USDC: 20 },
      fees: { performance: 10, management: 2 },
      autoCompound: true,
      rebalanceFreq: '4 hours',
      minDeposit: 1000,
      capacity: 50000000,
      utilization: 90
    },
    {
      id: 2,
      name: 'Stable Yield Max',
      strategy: 'Multi-Protocol Lending Optimizer',
      tvl: 32000000,
      apy: 18.7,
      risk: 'low',
      performance30d: 5.2,
      sharpe: 3.45,
      maxDrawdown: -2.1,
      assets: ['USDC', 'USDT', 'DAI'],
      allocation: { USDC: 40, USDT: 35, DAI: 25 },
      fees: { performance: 10, management: 1 },
      autoCompound: true,
      rebalanceFreq: '12 hours',
      minDeposit: 100,
      capacity: 40000000,
      utilization: 80
    },
    {
      id: 3,
      name: 'DeFi Index Pro',
      strategy: 'Diversified Protocol Governance Farming',
      tvl: 28000000,
      apy: 35.6,
      risk: 'medium',
      performance30d: 9.8,
      sharpe: 1.89,
      maxDrawdown: -15.2,
      assets: ['AAVE', 'CRV', 'UNI', 'COMP'],
      allocation: { AAVE: 30, CRV: 25, UNI: 25, COMP: 20 },
      fees: { performance: 10, management: 2 },
      autoCompound: true,
      rebalanceFreq: '24 hours',
      minDeposit: 500,
      capacity: 35000000,
      utilization: 80
    },
    {
      id: 4,
      name: 'High Risk Degen',
      strategy: 'Leveraged Yield Farming',
      tvl: 15000000,
      apy: 87.4,
      risk: 'high',
      performance30d: 24.5,
      sharpe: 0.92,
      maxDrawdown: -32.7,
      assets: ['Various'],
      allocation: { Leveraged: 70, Hedge: 30 },
      fees: { performance: 15, management: 2 },
      autoCompound: true,
      rebalanceFreq: '1 hour',
      minDeposit: 5000,
      capacity: 20000000,
      utilization: 75
    },
    {
      id: 5,
      name: 'Conservative Fixed',
      strategy: 'Fixed Income Protocol Aggregator',
      tvl: 21000000,
      apy: 12.8,
      risk: 'low',
      performance30d: 3.1,
      sharpe: 4.12,
      maxDrawdown: -1.2,
      assets: ['USDC'],
      allocation: { USDC: 100 },
      fees: { performance: 8, management: 1 },
      autoCompound: true,
      rebalanceFreq: 'Weekly',
      minDeposit: 100,
      capacity: 30000000,
      utilization: 70
    }
  ];

  // Filter vaults by risk
  const filteredVaults = filterRisk === 'all' 
    ? vaults 
    : vaults.filter(v => v.risk === filterRisk);

  // Performance data for selected vault
  const generatePerformanceData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 100 + (Math.random() - 0.3) * 20,
      benchmark: 100 + (Math.random() - 0.45) * 15
    }));
  };

  // Risk metrics for selected vault
  const generateRiskMetrics = (vault: any) => {
    if (!vault) return [];
    return [
      { metric: 'Volatility', value: vault.risk === 'low' ? 45 : vault.risk === 'medium' ? 65 : 85 },
      { metric: 'Liquidity', value: vault.risk === 'low' ? 90 : vault.risk === 'medium' ? 70 : 50 },
      { metric: 'Smart Contract', value: vault.risk === 'low' ? 95 : vault.risk === 'medium' ? 85 : 70 },
      { metric: 'Market', value: vault.risk === 'low' ? 80 : vault.risk === 'medium' ? 60 : 40 },
      { metric: 'Leverage', value: vault.risk === 'low' ? 95 : vault.risk === 'medium' ? 65 : 30 },
      { metric: 'Diversification', value: vault.risk === 'low' ? 85 : vault.risk === 'medium' ? 75 : 50 }
    ];
  };

  const getRiskColor = (risk: any) => {
    switch(risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getRiskBorderColor = (risk: any) => {
    switch(risk) {
      case 'low': return 'border-green-500/50';
      case 'medium': return 'border-yellow-500/50';
      case 'high': return 'border-red-500/50';
      default: return 'border-slate-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Immortal Vaults
              </h1>
              <p className="text-slate-400">Auto-compounding yield strategies</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'low', 'medium', 'high'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  filterRisk === risk
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                }`}
              >
                {risk} Risk
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total TVL', value: '$141M', icon: DollarSign, color: 'violet' },
            { label: 'Avg APY', value: '35.4%', icon: Percent, color: 'green' },
            { label: 'Active Vaults', value: '5', icon: Layers, color: 'blue' },
            { label: 'Your Deposits', value: '$12.5K', icon: Activity, color: 'pink' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 border border-slate-800">
                <div className={`flex items-center gap-2 text-${stat.color}-400 text-sm mb-2`}>
                  <Icon className="w-4 h-4" />
                  {stat.label}
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Vault Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {filteredVaults.map((vault) => {
            const isSelected = selectedVault?.id === vault.id;
            return (
              <div 
                key={vault.id}
                className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border transition-all cursor-pointer hover:border-violet-500/50 ${
                  isSelected ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-slate-800'
                }`}
                onClick={() => setSelectedVault(isSelected ? null : vault)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{vault.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getRiskColor(vault.risk)}`}>
                        {vault.risk} Risk
                      </span>
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <Shield className="w-4 h-4" />
                        Audited
                      </div>
                    </div>
                    <p className="text-slate-400 mb-1">{vault.strategy}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Min: ${vault.minDeposit.toLocaleString()}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Rebalance: {vault.rebalanceFreq}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400 mb-1">{vault.apy}%</div>
                    <p className="text-sm text-slate-400">APY</p>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">TVL</p>
                    <p className="text-sm font-bold">${(vault.tvl / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">30d Performance</p>
                    <p className={`text-sm font-bold ${vault.performance30d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {vault.performance30d >= 0 ? '+' : ''}{vault.performance30d}%
                    </p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Sharpe Ratio</p>
                    <p className="text-sm font-bold">{vault.sharpe}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Max Drawdown</p>
                    <p className="text-sm font-bold text-red-400">{vault.maxDrawdown}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-1">Utilization</p>
                    <p className="text-sm font-bold">{vault.utilization}%</p>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Capacity</span>
                    <span>{vault.utilization}% filled</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        vault.utilization > 90 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        vault.utilization > 75 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${vault.utilization}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-bold transition-all">
                    Deposit
                  </button>
                  <button className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg font-medium transition-all">
                    Withdraw
                  </button>
                  <button 
                    className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    Details
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Performance Chart */}
                      <div>
                        <h4 className="text-lg font-bold mb-4">30-Day Performance</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={generatePerformanceData()}>
                            <defs>
                              <linearGradient id="vaultPerf" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="day" stroke="#64748b" />
                            <YAxis stroke="#64748b" domain={[85, 125]} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                              formatter={(value: any) => (value != null ? `${Number(value).toFixed(2)}%` : '')}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="url(#vaultPerf)" strokeWidth={2} name="Vault" />
                            <Line type="monotone" dataKey="benchmark" stroke="#64748b" strokeWidth={1} strokeDasharray="5 5" name="Benchmark" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Risk Assessment */}
                      <div>
                        <h4 className="text-lg font-bold mb-4">Risk Assessment</h4>
                        <ResponsiveContainer width="100%" height={200}>
                          <RadarChart data={generateRiskMetrics(vault)}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="metric" stroke="#64748b" tick={{ fontSize: 11 }} />
                            <Radar name="Risk Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Asset Allocation */}
                      <div>
                        <h4 className="text-lg font-bold mb-4">Asset Allocation</h4>
                        <div className="space-y-3">
                          {Object.entries(vault.allocation).map(([asset, percent]: [string, any]) => (
                            <div key={asset}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">{asset}</span>
                                <span className="font-bold">{Number(percent)}%</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
                                  style={{ width: `${Number(percent)}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fee Structure */}
                      <div>
                        <h4 className="text-lg font-bold mb-4">Fee Structure</h4>
                        <div className="space-y-3">
                          <div className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-400">Performance Fee</span>
                              <span className="text-lg font-bold">{vault.fees.performance}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Info className="w-3 h-3" />
                              <span>60% burned, 25% to Immortal, 15% to veVEIL</span>
                            </div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-slate-400">Management Fee</span>
                              <span className="text-lg font-bold">{vault.fees.management}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Info className="w-3 h-3" />
                              <span>Annual fee on AUM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strategy Details */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-4">Strategy Details</h4>
                        <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                              <Zap className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                              <p className="font-bold mb-1">Auto-Compounding</p>
                              <p className="text-sm text-slate-400">Rewards automatically reinvested every {vault.rebalanceFreq}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                              <Shield className="w-4 h-4 text-pink-400" />
                            </div>
                            <div>
                              <p className="font-bold mb-1">Risk Management</p>
                              <p className="text-sm text-slate-400">Dynamic position sizing and stop-loss mechanisms</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <Target className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className="font-bold mb-1">Gas Optimization</p>
                              <p className="text-sm text-slate-400">Batch transactions to minimize fees for depositors</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-orange-300">
            <p className="font-bold mb-1">Risk Disclosure</p>
            <p>All vaults involve smart contract risk, market risk, and potential impermanent loss. Past performance does not guarantee future results. Only deposit what you can afford to lose.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultManager;
