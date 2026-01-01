'use client';

import { useState, useEffect } from 'react';
import { mockPrices } from '@/lib/mock-oracle';

export default function PriceWidget() {
  const [prices, setPrices] = useState(mockPrices);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const data = updated[key as keyof typeof updated];
          const change = (Math.random() - 0.5) * 0.02;
          data.price = data.price * (1 + change);
          data.change += (Math.random() - 0.5) * 0.5;
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Object.entries(prices).map(([symbol, data]) => (
        <div key={symbol} className="border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/50 transition-all">
          <div className="text-sm text-[#808080] mb-2">{symbol}</div>
          <div className="text-lg font-bold text-[#FFD700] mb-1">${data.price.toFixed(2)}</div>
          <div className={`text-xs ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {data.change >= 0 ? '↑' : '↓'} {Math.abs(data.change).toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}
