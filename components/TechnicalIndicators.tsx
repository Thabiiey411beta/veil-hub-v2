'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Indicator {
  pair: string;
  sma20: number | null;
  ema9: number | null;
  rsi: number | null;
  signal: 'bullish' | 'bearish' | 'neutral';
}

export default function TechnicalIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([
    { pair: 'BTC', sma20: null, ema9: null, rsi: null, signal: 'neutral' },
    { pair: 'ETH', sma20: null, ema9: null, rsi: null, signal: 'neutral' },
    { pair: 'SOL', sma20: null, ema9: null, rsi: null, signal: 'neutral' },
  ]);

  useEffect(() => {
    // Simulate fetching from Supra L1
    const mockData: Indicator[] = [
      { pair: 'BTC', sma20: 96500, ema9: 96800, rsi: 58, signal: 'bullish' },
      { pair: 'ETH', sma20: 3420, ema9: 3450, rsi: 62, signal: 'bullish' },
      { pair: 'SOL', sma20: 142, ema9: 145, rsi: 48, signal: 'neutral' },
    ];
    setIndicators(mockData);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-cyan-400" size={24} />
        On-Chain Technical Indicators
      </h3>
      
      <div className="space-y-4">
        {indicators.map((ind) => (
          <div key={ind.pair} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold text-white">{ind.pair}/USDT</span>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                ind.signal === 'bullish' ? 'bg-green-500/20 text-green-400' :
                ind.signal === 'bearish' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {ind.signal === 'bullish' ? <TrendingUp size={16} /> : 
                 ind.signal === 'bearish' ? <TrendingDown size={16} /> : 
                 <Activity size={16} />}
                {ind.signal.toUpperCase()}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400 mb-1">SMA(20)</div>
                <div className="text-white font-semibold">
                  {ind.sma20 ? `$${ind.sma20.toLocaleString()}` : '---'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">EMA(9)</div>
                <div className="text-white font-semibold">
                  {ind.ema9 ? `$${ind.ema9.toLocaleString()}` : '---'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">RSI(14)</div>
                <div className={`font-semibold ${
                  ind.rsi && ind.rsi < 30 ? 'text-green-400' :
                  ind.rsi && ind.rsi > 70 ? 'text-red-400' :
                  'text-white'
                }`}>
                  {ind.rsi || '---'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        Powered by Supra L1 On-Chain Indicators • 1H Timeframe
      </div>
    </div>
  );
}
