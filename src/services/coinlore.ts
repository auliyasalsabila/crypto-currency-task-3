import axios from 'axios';

import type { Cryptocurrency, TickersResponse } from '@/types/cryptocurrency';

export const TICKERS_URL = 'https://api.coinlore.net/api/tickers/';

export async function getCryptocurrencies(): Promise<Cryptocurrency[]> {
  const response = await axios.get<TickersResponse>(TICKERS_URL, { timeout: 15000 });
  if (!Array.isArray(response.data.data)) {
    throw new Error('Format respons CoinLore tidak sesuai.');
  }
  return response.data.data;
}
