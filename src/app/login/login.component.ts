import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaSignIn } from '@okta/okta-signin-widget';
import { OktaAuth } from '@okta/okta-auth-js';

import nttOktaConfig from '../config/ntt-okta-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn ({
      logo: 'assets/nttLogo.png',
      features: {
        registration: true
      },
      baseUrl: nttOktaConfig.oidc.issuer.split('/oauth2')[0],
      clientId: nttOktaConfig.oidc.clientId,
      redirectUri: nttOktaConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: nttOktaConfig.oidc.issuer,
        scopes: nttOktaConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl({
      el: '#okta-signin'
    },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      }, (error: any) => {
        throw error;
      }
    );
  }

  ngOnDestroy(): void {
      this.oktaSignIn.remove();
  }

}
