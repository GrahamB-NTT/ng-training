import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

import { AccessoryComponent } from './accessory/accessory.component';
import { ApparelComponent } from './apparel/apparel.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PolicyComponent } from './policy/policy.component';
import { PromoComponent } from './promo/promo.component';
import { SaleComponent } from './sale/sale.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'apparel', component: ApparelComponent },
  { path: 'accessory', component: AccessoryComponent },
  { path: 'promo', component: PromoComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'cart', component: CartComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
