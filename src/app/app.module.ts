import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApparelComponent } from './apparel/apparel.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { CartComponent } from './cart/cart.component';
import { PolicyComponent } from './policy/policy.component';
import { OrdersComponent } from './orders/orders.component';
import nttOktaConfig from './config/ntt-okta-config';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PopupComponent } from './popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';

const oktaAuth = new OktaAuth(nttOktaConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ApparelComponent,
    AccessoryComponent,
    CartComponent,
    PolicyComponent,
    OrdersComponent,
    CheckoutComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    MatCheckboxModule, 
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
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
