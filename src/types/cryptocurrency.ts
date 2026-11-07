export interface Cryptocurrency {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price_usd: string;
}

export interface TickersResponse {
  data: Cryptocurrency[];
}
