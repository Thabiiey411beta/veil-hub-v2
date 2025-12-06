# Supra Advanced Features Integration

## 🎯 Custom VEIL DeFi Index

Created on Supra L1 with equal-weighted top DeFi assets:
- **BTC_USDT** (Pair ID: 0)
- **ETH_USDT** (Pair ID: 1)
- **LINK_USDT** (Pair ID: 2)
- **AVAX_USDT** (Pair ID: 5)
- **DOT_USDT** (Pair ID: 6)

**Initial Value**: 1000  
**Weights**: 20% each (equal weighted)

### Deploy Index
```bash
./script/create-veil-index.sh
```

## 📊 Real-Time Price Feeds

### WebSocket Integration
Live OHLC data streaming at 5-second intervals:
```typescript
import { SupraWebSocket } from '@/lib/supra-websocket';

const ws = new SupraWebSocket();
ws.connect(['btc_usdt', 'eth_usdt'], 5, (data) => {
  console.log(data);
});
```

### REST API
Historical and latest prices:
```bash
# Latest price
curl -H "x-api-key: YOUR_KEY" \
  "https://prod-kline-rest.supra.com/latest?trading_pair=btc_usdt"

# Historical OHLC
curl -H "x-api-key: YOUR_KEY" \
  "https://prod-kline-rest.supra.com/history?trading_pair=btc_usdt&startDate=1732014893723&endDate=1732014910000&interval=5"
```

## 🎨 Price Widgets

### Horizontal Ticker
```html
<iframe src="https://supra.com/data/widgets?widgetType=horizontal&instrumentPairs=btc_usdt,eth_usdt,supra_usdt&x-api-key=YOUR_KEY" 
  width="100%" height="400px" frameborder="0"></iframe>
```

### Vertical Widget
```html
<iframe src="https://supra.com/data/widgets?widgetType=vertical&instrumentPairs=btc_usdt,eth_usdt&x-api-key=YOUR_KEY" 
  width="100%" height="800px" frameborder="0"></iframe>
```

## 🔑 Get API Key
Request your Supra API key: https://supra.com/request-api-key

## 📦 Components Created
- `lib/supra-websocket.ts` - WebSocket client
- `components/PriceWidget.tsx` - Real-time price display
- `script/create-veil-index.sh` - Index deployment script
