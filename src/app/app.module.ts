import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { Injector } from '@angular/core';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import nttOktaConfig from './config/ntt-okta-config';

const oktaAuth = new OktaAuth(nttOktaConfig.oidc);

/* const oktaConfig = Object.assign({
  onAuthRequired: (OktaAuth: any, injector: Injector) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, nttOktaConfig.oidc) */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
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
