# 🌑 Veil Hub UI Components Library

## Overview

Complete collection of premium bio-digital futurism UI components for Veil Hub v17. All components follow the design system specifications and are built with Tailwind CSS.

---

## 📄 Pages & Components

### 1. Landing Page (`landing-updated.tsx`)

**Purpose**: Entry point showcasing core value proposition

**Key Features**:
- Animated network visualization (SVG)
- Hero section with key metrics
- Feature highlights with icons
- Tokenomics preview
- Security section
- Footer CTA

**Key Metrics Displayed**:
- 5.5% APR Fixed Borrowing
- 12-25% APR Immortal Yield
- 2.5x veVEIL Boost

**Components Used**:
- Navigation bar with scroll links
- Hero section with dual layout
- Feature grid (6 items)
- Tokenomics grid (4 items)
- Security checklist (6 items)

---

### 2. Dashboard (`dashboard-updated.tsx`)

**Purpose**: Main user interface after wallet connection

**Key Features**:
- Real-time metric updates
- TVL trend chart (30 days)
- Yield distribution breakdown
- User positions display
- Recent activity feed
- Quick action buttons

**Real-Time Metrics**:
- Total Value Locked (TVL)
- VEIL Price
- Supply Floor
- User Net Worth

**Sections**:
1. **Key Metrics Grid** (4 cards)
   - TVL, Price, Supply Floor, Net Worth
   - Real-time updates every 3 seconds

2. **Charts Section** (2 charts)
   - TVL Trend (30-day bar chart)
   - Yield Split (distribution breakdown)

3. **Portfolio Section** (2 cards)
   - Your Positions (3 positions)
   - Recent Activity (4 transactions)

4. **Quick Actions** (4 buttons)
   - Borrow USDC
   - Lock VEIL
   - Burn VEIL
   - Claim Yield

---

### 3. Analytics Page (`analytics-premium.tsx`)

**Purpose**: Protocol-wide performance and analytics

**Key Features**:
- Timeframe selector (24h, 7d, 30d, 90d, 1y)
- Real-time metric updates
- TVL and volume charts
- Revenue distribution analytics
- Burn rate tracking
- Supply metrics
- User activity heatmap
- Protocol health indicators
- Performance summary table

**Metrics Tracked**:
- Total Value Locked (TVL)
- 24h Volume
- Active Users
- Total Burned
- Average APY

**Charts**:
1. **TVL Trend** - 30-day historical data
2. **24h Volume** - Daily volume tracking
3. **Revenue Split** - Distribution breakdown
4. **Burn Rate** - Daily/Weekly/Monthly
5. **Supply Metrics** - Total/Circulating/Locked

**Analytics Sections**:
1. **Key Metrics** (5 cards with real-time updates)
2. **Charts Grid** (2 main charts)
3. **Revenue & Burn Analytics** (3 cards)
4. **User Activity & Transactions** (2 cards)
5. **Performance Summary Table** (5 rows)

---

### 4. Perpetual DEX (`perpetual-dex-updated.tsx`)

**Purpose**: Advanced trading interface with order management

**Key Features**:
- Trading pair selector (4 pairs)
- Real-time price charts
- Order book display (bids/asks)
- Order form with leverage
- LP VACUUM status indicator
- Buy/Sell toggle
- Order type selector (limit/market)
- Order summary with fees

**Trading Pairs**:
- BTC/USDC
- ETH/USDC
- LINK/USDC
- AVAX/USDC

**Sections**:
1. **Left Sidebar** - Trading pairs list
2. **Center** - Chart and order book
3. **Right Sidebar** - Order form
4. **LP VACUUM Info** - Status indicators

**LP VACUUM Features**:
- Encrypted Execution
- Slippage Protection (0.05%)
- MEV Resistance
- Privacy Level (Maximum)

---

### 5. Tokenomics Page (`tokenomics-premium.tsx`)

**Purpose**: Token economics and revenue distribution

**Key Features**:
- Token distribution breakdown
- Scarcity mechanisms (6 types)
- Revenue distribution flows (pre/post-floor)
- Projected supply reduction
- Key metrics summary

**Distribution Breakdown**:
- Immortal Reserve: 20%
- Team: 15%
- Investors: 10%
- Liquidity Mining: 25%
- Treasury: 20%
- Community: 10%

**Scarcity Mechanisms**:
1. Burn-to-Earn
2. Vault Fee Burn (60%)
3. Buyback & Burn (30%)
4. Progressive Bonuses (1.5x)
5. veVEIL Lock
6. Supply Floor

**Revenue Distribution**:
- **Pre-Floor Phase**:
  - Borrow Interest: 50% Immortal, 30% Buyback, 20% veVEIL
  - Vault Fees: 60% Burn, 25% Immortal, 15% veVEIL

- **Post-Floor Phase**:
  - Borrow Interest: 40% Immortal, 35% Treasury, 25% veVEIL
  - Vault Fees: 50% Immortal, 30% Treasury, 20% veVEIL

---

## 🎨 Component Patterns

### Card Component
```tsx
<div className="border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
  {/* Content */}
</div>
```

### Metric Card
```tsx
<div className="group border border-[#FFD700]/20 rounded-lg p-6 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all">
  <div className="flex justify-between items-start mb-4">
    <span className="text-[#808080] text-xs">{label}</span>
    <span className="text-[#FFD700]">◆</span>
  </div>
  <div className="text-2xl font-bold mb-2">{value}</div>
  <div className="text-xs text-[#FFD700]">↑ {change}</div>
</div>
```

### Chart Component
```tsx
<div className="h-64 flex items-end justify-between gap-1">
  {data.map((item, i) => (
    <div
      key={i}
      className="flex-1 bg-gradient-to-t from-[#FFD700]/40 to-[#FFD700]/10 rounded-t hover:from-[#FFD700]/60 hover:to-[#FFD700]/30 transition-all"
      style={{ height: `${(item.value / max) * 100}%` }}
    />
  ))}
</div>
```

### Progress Bar
```tsx
<div className="h-2 bg-[#2C3E50] rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-[#FFD700] to-transparent"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Button Variants

**Primary Button**:
```tsx
<button className="px-8 py-3 bg-[#FFD700] text-[#0A0A0A] font-bold rounded-lg hover:bg-[#FFF700] transition-all hover:shadow-lg hover:shadow-[#FFD700]/50">
  Action
</button>
```

**Secondary Button**:
```tsx
<button className="px-8 py-3 border border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 transition-all">
  Action
</button>
```

---

## 📊 Data Visualization

### Chart Types

1. **Bar Chart** - TVL, Volume, User trends
2. **Line Chart** - Price movements
3. **Pie Chart** - Distribution breakdown
4. **Progress Bar** - Metrics and percentages
5. **Table** - Performance summary

### Color Coding

- **Positive**: Gold (#FFD700)
- **Negative**: Red (#FF6B6B)
- **Neutral**: Gray (#808080)
- **Active**: Gold with glow
- **Inactive**: Gray with reduced opacity

---

## 🔄 Real-Time Updates

### Update Intervals

- **Metrics**: 3-5 seconds
- **Charts**: 5-10 seconds
- **Activity Feed**: 10-30 seconds
- **Price Feeds**: Real-time (WebSocket)

### Implementation

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setMetrics(prev => ({
      ...prev,
      tvl: prev.tvl + (Math.random() - 0.5) * 5000000,
    }));
  }, 3000);
  return () => clearInterval(interval);
}, []);
```

---

## 🎯 Responsive Design

### Breakpoints

- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1024px): 2-column layout
- **Desktop** (> 1024px): Multi-column, complex layouts

### Grid Patterns

```tsx
// Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## ♿ Accessibility

### Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (4.5:1)
- Focus indicators visible
- Respects `prefers-reduced-motion`

---

## 🚀 Performance Optimizations

### Techniques

1. **CSS Animations** - Use `transform` and `opacity`
2. **Lazy Loading** - Load charts on demand
3. **Memoization** - Prevent unnecessary re-renders
4. **Code Splitting** - Separate page components
5. **Image Optimization** - SVG for icons

### Bundle Size

- Landing Page: 10.4 kB
- Dashboard: 8.2 kB
- Analytics: 9.1 kB
- DEX: 11.5 kB
- Tokenomics: 7.8 kB

---

## 📚 Usage Examples

### Displaying Metrics

```tsx
const formatNumber = (num: number) => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

<div className="text-2xl font-bold">{formatNumber(245000000)}</div>
// Output: $245.00M
```

### Creating Charts

```tsx
<div className="h-64 flex items-end justify-between gap-1">
  {chartData.map((data, i) => (
    <div
      key={i}
      className="flex-1 bg-gradient-to-t from-[#FFD700]/40 to-[#FFD700]/10 rounded-t"
      style={{ height: `${(data.value / maxValue) * 100}%` }}
    />
  ))}
</div>
```

### Real-Time Updates

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    fetchMetrics().then(setMetrics);
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

---

## 🔧 Customization

### Color Customization

Update in `tailwind.config.ts`:

```ts
colors: {
  veil: {
    gold: '#FFD700',
    dark: '#0A0A0A',
    text: '#E0E0E0',
  }
}
```

### Animation Customization

Update in `globals.css`:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

---

## 📋 Component Checklist

- [x] Landing Page
- [x] Dashboard
- [x] Analytics Page
- [x] Perpetual DEX
- [x] Tokenomics Page
- [x] Design System
- [x] Global CSS
- [x] Tailwind Config
- [x] Responsive Design
- [x] Real-Time Updates
- [x] Accessibility
- [x] Performance Optimization

---

## 🌑 Welcome to the Darkness

All components are designed to provide a premium, futuristic experience while maintaining clarity and efficiency. The bio-digital futurism aesthetic creates a sense of entering a new era of DeFi.

**Built for the sophisticated investor. Designed for the future.**
