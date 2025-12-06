'use client';

import { useEffect, useState } from 'react';
import { SupraWebSocket, OHLCData } from '@/lib/supra-websocket';

const PAIRS = ['btc_usdt', 'eth_usdt', 'link_usdt', 'avax_usdt', 'dot_usdt'];

export default function PriceWidget() {
  const [prices, setPrices] = useState<Record<string, OHLCData>>({});

  useEffect(() => {
    const ws = new SupraWebSocket();
    
    ws.connect(PAIRS, 5, (data) => {
      const priceMap: Record<string, OHLCData> = {};
      data.forEach(item => {
        priceMap[item.tradingPair] = item;
      });
      setPrices(prev => ({ ...prev, ...priceMap }));
    });

    return () => ws.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {PAIRS.map(pair => {
        const data = prices[pair];
        const symbol = pair.split('_')[0].toUpperCase();
        
        return (
          <div key={pair} className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">{symbol}</div>
            <div className="text-2xl font-bold text-white">
              ${data?.currentPrice.toLocaleString() || '---'}
            </div>
            {data && (
              <div className={`text-sm mt-1 ${parseFloat(data.close) >= parseFloat(data.open) ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(data.close) >= parseFloat(data.open) ? '↑' : '↓'} 
                {Math.abs(((parseFloat(data.close) - parseFloat(data.open)) / parseFloat(data.open)) * 100).toFixed(2)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
