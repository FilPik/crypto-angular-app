import {Component, inject, OnInit, signal, computed} from '@angular/core';
import {CryptoService} from '../../services/crypto.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-coin-detail',
  imports: [
    DecimalPipe,
    RouterLink,
    BaseChartDirective
  ],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss'
})
export class CoinDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected cryptoService = inject(CryptoService);

  selectedCoin = signal<any>(null);

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  chartData = computed(() => {
    const coin = this.selectedCoin();
    if (!coin || !coin.history) return undefined;
    return {
      labels: coin.history.map((h: any) => h.time),
      datasets: [{
        data: coin.history.map((h: any) => h.price),
        label: 'Cena (USD)',
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };
  });

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
