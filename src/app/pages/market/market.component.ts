import {Component, computed, EventEmitter, inject, signal} from '@angular/core';
import {CryptoService} from '../../services/crypto.service';
import {RouterLink} from '@angular/router';
import {filter} from 'rxjs';


@Component({
  selector: 'app-market',
  imports: [
    RouterLink
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
  host: { 'ngSkipHydration': 'true' }
})
export class MarketComponent {
  cryptoService = inject(CryptoService);

  protected readonly crypto = crypto;

  searchQuery = signal('');

  filteredCryptos = computed(() => {
    const query = this.searchQuery().toLowerCase();

    const allCoins = this.cryptoService.cryptos();

    return allCoins.filter(coin =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  });

  updateSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected readonly filter = filter;
}
