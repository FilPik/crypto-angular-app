import {Component, inject, OnInit, signal} from '@angular/core';
import {CryptoService} from '../../services/crypto.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-coin-detail',
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss'
})
export class CoinDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected cryptoService = inject(CryptoService);

  selectedCoin = signal<any>(null);

  ngOnInit() {
    const symbolFromUrl = this.route.snapshot.paramMap.get('symbol');

    if(symbolFromUrl) {
      const coinData = this.cryptoService.getCoinBySymbol(symbolFromUrl.toUpperCase());

      this.selectedCoin.set(coinData);
    }
    else {
      alert("Coin not found.");
    }
  }
}
