// Real-time chart data generator
export const generateChartData = (days: number = 30) => {
  const data = [];
  const now = Date.now();
  let basePrice = 42850;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const volatility = (Math.random() - 0.5) * 2000;
    basePrice += volatility;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      BTC: Math.round(basePrice),
      ETH: Math.round(basePrice / 17.5),
      LINK: Math.round(basePrice / 2300),
      AVAX: Math.round(basePrice / 1200),
      VEIL: Math.round(basePrice / 50000),
    });
  }
  return data;
};

export const generateVolumeData = (days: number = 30) => {
  const data = [];
  const now = Date.now();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: Math.round(Math.random() * 500000000 + 100000000),
      trades: Math.round(Math.random() * 50000 + 10000),
    });
  }
  return data;
};

export const generateYieldData = (days: number = 30) => {
  const data = [];
  const now = Date.now();
  let baseYield = 12;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    baseYield += (Math.random() - 0.5) * 2;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      immortalYield: Math.round(baseYield * 100) / 100,
      veVeilBoost: Math.round((baseYield * 1.8) * 100) / 100,
      borrowRate: 5.5,
    });
  }
  return data;
};

export const generatePortfolioData = () => {
  return [
    { name: 'Immortal Reserve', value: 120000000, color: '#FFD700' },
    { name: 'Vault Deposits', value: 85000000, color: '#8b5cf6' },
    { name: 'Borrowed USDC', value: 40000000, color: '#ef4444' },
  ];
};
