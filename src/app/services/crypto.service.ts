import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  http = inject(HttpClient);

  balance = signal(1000000);
  boughtCoins = signal<any[]>([]);

  cryptos = signal([
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 65000 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 35000 }
  ])

  constructor() {
    this.fetchCryptos();
  }

  fetchCryptos() {
    this.http.get<any[]>('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT"]').subscribe({
      next: (data) => {
        const mappedCryptos = data.map(coin => {
          const cleanSymbol = coin.symbol.replace('USDT', '');

          return {
            id: cleanSymbol.toLowerCase(),
            name: cleanSymbol === 'BTC' ? 'Bitcoin' : cleanSymbol === 'ETH' ? 'Ethereum' : cleanSymbol === 'SOL' ? 'Solana' : 'BNB',
            symbol: cleanSymbol,
            price: Number(coin.price)
          };
        });
        this.cryptos.set(mappedCryptos);
      },
    });
  }

  buyCoin(coin: any, amount: number) {
    const cost = coin.price * amount;
    if (this.balance() >= cost) {
      this.balance.set(this.balance() - cost);
      this.boughtCoins.update(currentCoins => {
        const existingCoin = currentCoins.find(item => item.symbol === coin.symbol);
        if (existingCoin) {
        return currentCoins.map(item => {
          if (item.symbol === coin.symbol) {
            return {...item, amount: item.amount + amount};
          }
          return item;
        });
        } else {
          return [...currentCoins, { symbol: coin.symbol, amount: amount }];        }
      });
    }
    else {
      alert('Brak kasy')
    }
  }
}
