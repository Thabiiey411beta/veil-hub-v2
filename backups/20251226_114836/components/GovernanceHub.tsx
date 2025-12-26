import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Vote, Lock, Shield, TrendingUp, DollarSign, Users, Clock, CheckCircle, XCircle, AlertCircle, Eye, Flame, Target, Zap } from 'lucide-react';

const GovernanceHub = () => {
  const [selectedTab, setSelectedTab] = useState('proposals');
  const [voteAmount, setVoteAmount] = useState('');
  
  // User's voting power
  const userVotingPower = {
    veVEIL: 125000,
    votingPower: 312500, // includes boost
    boost: 2.5,
    unlockDate: '2025-06-15',
    unclaimedBribes: 1234.56
  };

  // Active Proposals
  const proposals = [
    {
      id: 1,
      title: 'Increase Vault Performance Fee Burn Rate',
      description: 'Proposal to increase vault fee burn from 60% to 70%, further accelerating VEIL deflation',
      author: '0x742d...35ba',
      status: 'active',
      endDate: '3 days',
      votesFor: 2456789,
      votesAgainst: 345678,
      quorum: 85,
      category: 'Tokenomics',
      impact: 'High'
    },
    {
      id: 2,
      title: 'Add Support for New Collateral Assets',
      description: 'Enable SOL, AVAX, and DOT as collateral for borrowing',
      author: '0x1a2b...cd3e',
      status: 'active',
      endDate: '5 days',
      votesFor: 1876543,
      votesAgainst: 523456,
      quorum: 72,
      category: 'Protocol',
      impact: 'Medium'
    },
    {
      id: 3,
      title: 'Reduce Fixed Borrowing Rate',
      description: 'Lower the fixed APR from 5.5% to 5.0% to increase competitiveness',
      author: '0x9f8e...4321',
      status: 'active',
      endDate: '1 day',
      votesFor: 987654,
      votesAgainst: 1234567,
      quorum: 68,
      category: 'Rates',
      impact: 'High'
    },
    {
      id: 4,
      title: 'Launch Governance Mining Program',
      description: 'Reward active governance participants with additional VEIL emissions',
      author: '0x5c6d...789a',
      status: 'pending',
      endDate: '7 days',
      votesFor: 456789,
      votesAgainst: 123456,
      quorum: 45,
      category: 'Incentives',
      impact: 'Medium'
    }
  ];

  // Gauge Weights (for bribe marketplace)
  const gauges = [
    {
      id: 1,
      name: 'BTC/ETH Vault',
      currentWeight: 28.5,
      nextWeight: 31.2,
      tvl: '$45M',
      bribes: '$12,345',
      roi: '23.4%',
      votes: 2456789
    },
    {
      id: 2,
      name: 'Stable Yield Strategy',
      currentWeight: 22.3,
      nextWeight: 20.1,
      tvl: '$32M',
      bribes: '$8,765',
      roi: '18.7%',
      votes: 1876543
    },
    {
      id: 3,
      name: 'High Risk Perps',
      currentWeight: 15.7,
      nextWeight: 17.8,
      tvl: '$18M',
      bribes: '$15,432',
      roi: '42.3%',
      votes: 1324567
    },
    {
      id: 4,
      name: 'DeFi Index Vault',
      currentWeight: 18.2,
      nextWeight: 16.4,
      tvl: '$25M',
      bribes: '$6,543',
      roi: '15.2%',
      votes: 987654
    },
    {
      id: 5,
      name: 'Conservative Fixed',
      currentWeight: 15.3,
      nextWeight: 14.5,
      tvl: '$21M',
      bribes: '$4,321',
      roi: '12.8%',
      votes: 789012
    }
  ];

  // Bribe Opportunities
  const bribeMarket = [
    {
      gauge: 'BTC/ETH Vault',
      protocol: 'VaultDAO',
      bribeAmount: '$12,345',
      perVote: '$0.0050',
      deadline: '2 days',
      claimed: false
    },
    {
      gauge: 'High Risk Perps',
      protocol: 'DegenFi',
      bribeAmount: '$15,432',
      perVote: '$0.0117',
      deadline: '3 days',
      claimed: false
    },
    {
      gauge: 'Stable Yield',
      protocol: 'StableDAO',
      bribeAmount: '$8,765',
      perVote: '$0.0047',
      deadline: '1 day',
      claimed: false
    }
  ];

  // Voting History
  const votingHistory = [
    { proposal: 'Increase burn rate to 65%', vote: 'For', power: 250000, outcome: 'Passed', date: '2024-12-15' },
    { proposal: 'Add LINK collateral', vote: 'For', power: 250000, outcome: 'Passed', date: '2024-12-10' },
    { proposal: 'Reduce fees to 4bps', vote: 'Against', power: 250000, outcome: 'Failed', date: '2024-12-05' }
  ];

  // Governance Stats
  const governanceStats = [
    { label: 'Total veVEIL', value: '200M', icon: Lock, color: 'violet' },
    { label: 'Active Voters', value: '3,421', icon: Users, color: 'pink' },
    { label: 'Proposals (30d)', value: '12', icon: Vote, color: 'blue' },
    { label: 'Bribe Volume', value: '$234K', icon: DollarSign, color: 'green' }
  ];

  const renderProposals = () => (
    <div className="space-y-4">
      {proposals.map((proposal) => {
        const totalVotes = proposal.votesFor + proposal.votesAgainst;
        const forPercent = (proposal.votesFor / totalVotes) * 100;
        const againstPercent = (proposal.votesAgainst / totalVotes) * 100;
        
        return (
          <div key={proposal.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{proposal.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    proposal.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {proposal.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    proposal.impact === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {proposal.impact} Impact
                  </span>
                </div>
                <p className="text-slate-400 mb-3">{proposal.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>By {proposal.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Ends in {proposal.endDate}
                  </span>
                  <span>•</span>
                  <span>{proposal.category}</span>
                </div>
              </div>
            </div>

            {/* Voting Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Voting Progress</span>
                <span className="text-slate-400">Quorum: {proposal.quorum}%</span>
              </div>
              <div className="relative h-3 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{ width: `${forPercent}%` }}
                />
                <div 
                  className="absolute top-0 h-full bg-gradient-to-r from-red-500 to-rose-600"
                  style={{ right: 0, width: `${againstPercent}%` }}
                />
                <div 
                  className="absolute top-0 left-0 w-1 h-full bg-white/50"
                  style={{ left: `${proposal.quorum}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-bold">{forPercent.toFixed(1)}%</span>
                  <span className="text-slate-500">({(proposal.votesFor / 1000000).toFixed(2)}M votes)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">({(proposal.votesAgainst / 1000000).toFixed(2)}M votes)</span>
                  <span className="text-red-400 font-bold">{againstPercent.toFixed(1)}%</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
              </div>
            </div>

            {/* Vote Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button className="py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold transition-all">
                Vote For
              </button>
              <button className="py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-lg font-bold transition-all">
                Vote Against
              </button>
              <button className="py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderGauges = () => (
    <div className="space-y-6">
      {/* Gauge Weight Distribution */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold mb-4">Current Gauge Weights</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gauges}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#64748b" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
            <Bar dataKey="currentWeight" fill="#8b5cf6" name="Current Weight" />
            <Bar dataKey="nextWeight" fill="#ec4899" name="Next Epoch" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gauge Cards */}
      <div className="grid grid-cols-1 gap-4">
        {gauges.map((gauge) => (
          <div key={gauge.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-violet-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold mb-1">{gauge.name}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>TVL: {gauge.tvl}</span>
                  <span>•</span>
                  <span>ROI: <span className="text-green-400 font-bold">{gauge.roi}</span></span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-violet-400">{gauge.currentWeight}%</div>
                <div className={`text-sm ${gauge.nextWeight > gauge.currentWeight ? 'text-green-400' : 'text-red-400'}`}>
                  {gauge.nextWeight > gauge.currentWeight ? '↑' : '↓'} {Math.abs(gauge.nextWeight - gauge.currentWeight).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Total Votes</p>
                <p className="text-sm font-bold">{(gauge.votes / 1000000).toFixed(2)}M</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Active Bribes</p>
                <p className="text-sm font-bold text-green-400">{gauge.bribes}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-1">Your Votes</p>
                <p className="text-sm font-bold">0</p>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Vote amount"
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-violet-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-bold text-sm transition-all">
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBribes = () => (
    <div className="space-y-4">
      {/* Bribe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <DollarSign className="w-4 h-4" />
            Total Bribes
          </div>
          <p className="text-2xl font-bold">$234,567</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Target className="w-4 h-4" />
            Your Earnings
          </div>
          <p className="text-2xl font-bold text-green-400">$1,234.56</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Zap className="w-4 h-4" />
            Avg. ROI
          </div>
          <p className="text-2xl font-bold text-violet-400">18.7%</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
            <Clock className="w-4 h-4" />
            Next Epoch
          </div>
          <p className="text-2xl font-bold">2d 14h</p>
        </div>
      </div>

      {/* Active Bribes */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Active Bribe Marketplace</h3>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-bold text-sm transition-all">
            Claim All ({userVotingPower.unclaimedBribes.toFixed(2)} USDC)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-400 border-b border-slate-700">
              <tr>
                <th className="text-left pb-3">Gauge</th>
                <th className="text-left pb-3">Protocol</th>
                <th className="text-right pb-3">Total Bribe</th>
                <th className="text-right pb-3">Per Vote</th>
                <th className="text-right pb-3">Your Est. Earnings</th>
                <th className="text-right pb-3">Deadline</th>
                <th className="text-right pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bribeMarket.map((bribe, idx) => {
                const estimatedEarnings = parseFloat(bribe.perVote.replace('$', '')) * userVotingPower.votingPower;
                return (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-4 font-medium">{bribe.gauge}</td>
                    <td className="py-4 text-slate-400">{bribe.protocol}</td>
                    <td className="py-4 text-right font-bold text-green-400">{bribe.bribeAmount}</td>
                    <td className="py-4 text-right">{bribe.perVote}</td>
                    <td className="py-4 text-right font-bold text-violet-400">${estimatedEarnings.toFixed(2)}</td>
                    <td className="py-4 text-right text-slate-400">{bribe.deadline}</td>
                    <td className="py-4 text-right">
                      <button className="px-3 py-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 rounded text-xs font-medium transition-all">
                        Vote & Earn
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Bribe */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold mb-4">Create Bribe</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Select Gauge</label>
            <select className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500">
              <option>BTC/ETH Vault</option>
              <option>Stable Yield Strategy</option>
              <option>High Risk Perps</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Bribe Amount (USDC)</label>
            <input
              type="number"
              placeholder="10,000"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Duration (Epochs)</label>
            <select className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500">
              <option>1 Epoch (7 days)</option>
              <option>2 Epochs (14 days)</option>
              <option>4 Epochs (28 days)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 rounded-lg font-bold transition-all">
              Create Bribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <Vote className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Dark Gauges
              </h1>
              <p className="text-slate-400">Encrypted governance & bribe marketplace</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {governanceStats.map((stat, idx) => {
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

        {/* Voting Power Card */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Your veVEIL</p>
                <p className="text-2xl font-bold">{userVotingPower.veVEIL.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Voting Power</p>
                <p className="text-2xl font-bold text-violet-400">{userVotingPower.votingPower.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Boost Multiplier</p>
                <p className="text-2xl font-bold text-pink-400">{userVotingPower.boost}x</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Unclaimed Bribes</p>
                <p className="text-2xl font-bold text-green-400">${userVotingPower.unclaimedBribes.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Lock Expires</p>
                <p className="text-2xl font-bold">{userVotingPower.unlockDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'proposals', label: 'Proposals', icon: Vote },
            { id: 'gauges', label: 'Gauge Weights', icon: Target },
            { id: 'bribes', label: 'Bribe Market', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 'proposals' && renderProposals()}
        {selectedTab === 'gauges' && renderGauges()}
        {selectedTab === 'bribes' && renderBribes()}
      </div>
    </div>
  );
};

export default GovernanceHub;
