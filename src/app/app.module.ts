import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { ApparelComponent } from './apparel/apparel.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { PromoComponent } from './promo/promo.component';
import { SaleComponent } from './sale/sale.component';
import { CartComponent } from './cart/cart.component';
import { PolicyComponent } from './policy/policy.component';
import { OrdersComponent } from './orders/orders.component';
import nttOktaConfig from './config/ntt-okta-config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const oktaAuth = new OktaAuth(nttOktaConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    ApparelComponent,
    AccessoryComponent,
    PromoComponent,
    SaleComponent,
    CartComponent,
    PolicyComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    NgbModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: { oktaAuth }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
