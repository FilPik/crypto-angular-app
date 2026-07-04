import { Routes } from '@angular/router';
import {MarketComponent} from './pages/market/market.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {CoinDetailComponent} from './pages/coin-detail/coin-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'market',
    pathMatch: 'full',
  },
  {
    path: 'market',
    component: MarketComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path:'coin/:symbol',
    component: CoinDetailComponent,
  }
];
