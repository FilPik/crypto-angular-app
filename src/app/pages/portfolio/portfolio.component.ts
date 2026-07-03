import {Component, inject} from '@angular/core';
import {CryptoService} from '../../services/crypto.service';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  cryptoService = inject(CryptoService);
  protected readonly crypto = crypto;
}
