import { Component, inject } from '@angular/core';
import {CryptoService} from '../../services/crypto.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-market',
  imports: [
    RouterLink
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent {
  cryptoService = inject(CryptoService);

  protected readonly crypto = crypto;
}
