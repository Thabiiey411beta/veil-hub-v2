'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BorrowPage() {
  const [collateral, setCollateral] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');

  const handleBorrow = () => {
    toast.success('Borrow feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Borrow USDC
        </h1>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Collateral (VEIL)</label>
            <input
              type="number"
              value={collateral}
              onChange={(e) => setCollateral(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              placeholder="18,000"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Borrow Amount (USDC)</label>
            <input
              type="number"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              placeholder="10,000"
            />
          </div>

          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Interest Rate:</span>
              <span className="text-white font-semibold">5.5% APR</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Min Collateral Ratio:</span>
              <span className="text-white font-semibold">180%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Liquidation Ratio:</span>
              <span className="text-white font-semibold">120%</span>
            </div>
          </div>

          <button
            onClick={handleBorrow}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Borrow USDC
          </button>
        </div>
      </div>
    </div>
  );
}
