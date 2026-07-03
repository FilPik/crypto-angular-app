import { Component, inject } from '@angular/core';
import {CryptoService} from '../../services/crypto.service';


@Component({
  selector: 'app-market',
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent {
  cryptoService = inject(CryptoService);

  protected readonly crypto = crypto;
}
