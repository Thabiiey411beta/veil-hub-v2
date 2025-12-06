// Supra WebSocket real-time price feeds
const WS_URL = 'wss://prod-kline-ws.supra.com';
const API_KEY = process.env.NEXT_PUBLIC_SUPRA_API_KEY || '';

export interface OHLCData {
  time: string;
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  tradingPair: string;
  currentPrice: number;
}

export class SupraWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(pairs: string[], resolution: number, onData: (data: OHLCData[]) => void) {
    this.ws = new WebSocket(WS_URL);
    
    this.ws.onopen = () => {
      console.log('Supra WebSocket connected');
      this.reconnectAttempts = 0;
      
      this.ws?.send(JSON.stringify({
        action: 'subscribe',
        channels: [{
          name: 'ohlc_datafeed',
          resolution,
          tradingPairs: pairs
        }]
      }));
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === 'ohlc_datafeed') {
        onData(data.payload);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(pairs, resolution, onData), 3000);
      }
    };
  }

  disconnect() {
    this.ws?.close();
  }
}
