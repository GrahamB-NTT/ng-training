import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaSignIn } from '@okta/okta-signin-widget';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';

import nttOktaConfig from '../config/ntt-okta-config';

const Default_Original_Uri = window.location.origin;

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
        registration: false
      },
      i18n: {
        'en': {
          'primaryauth.username.placeholder': 'Portal ID'
        }
      },
      baseUrl: nttOktaConfig.oidc.issuer.split('/oauth2')[0],
      clientId: nttOktaConfig.oidc.clientId,
      redirectUri: nttOktaConfig.oidc.redirectUri,
      authParams: {
        pkce: nttOktaConfig.oidc.pkce,
        issuer: nttOktaConfig.oidc.issuer,
        scopes: nttOktaConfig.oidc.scopes,
      }
    });
  }

  ngOnInit(): void {
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === Default_Original_Uri) {
      this.oktaAuth.setOriginalUri('/');
    }

    var searchParams = new URL(window.location.href).searchParams;
    this.oktaSignIn.otp = searchParams.get('otp');
    this.oktaSignIn.state = searchParams.get('state');

    this.oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin'
    }).then((tokens: Tokens) => {
      this.oktaSignIn.remove();
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((e: any) => {
      throw e;
    });
  }

  ngOnDestroy(): void {
      this.oktaSignIn.remove();
  }

}
