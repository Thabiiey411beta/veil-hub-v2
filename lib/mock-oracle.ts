// Mock Supra Oracle Price Data Service
export const mockPrices = {
  BTC: { price: 42850, change: 2.5, volume: 1200000000 },
  ETH: { price: 2450, change: 1.8, volume: 850000000 },
  LINK: { price: 18.50, change: 3.2, volume: 320000000 },
  AVAX: { price: 35.20, change: 1.1, volume: 180000000 },
  VEIL: { price: 0.85, change: 5.2, volume: 45000000 },
  USDC: { price: 1.0, change: 0.0, volume: 2000000000 },
};

export const mockMetrics = {
  tvl: 245000000,
  volume24h: 125000000,
  activeUsers: 8542,
  totalBurned: 52000000,
  avgAPY: 18.5,
};

export const mockOrderBook = {
  BTC: {
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
  },
};

export function getPriceData(symbol: string) {
  return mockPrices[symbol as keyof typeof mockPrices] || { price: 0, change: 0, volume: 0 };
}

export function getMetrics() {
  return mockMetrics;
}

export function getOrderBook(pair: string) {
  return mockOrderBook[pair as keyof typeof mockOrderBook] || { bids: [], asks: [] };
}

export function simulatePriceUpdate(symbol: string) {
  const data = mockPrices[symbol as keyof typeof mockPrices];
  if (data) {
    const change = (Math.random() - 0.5) * 0.1;
    data.price += data.price * change;
    data.change += (Math.random() - 0.5) * 0.5;
  }
  return data;
}
