import { Component, Inject, OnInit } from '@angular/core';

import {OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  username: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaAuth.authStateManager.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      this.username = (await this.oktaAuth.getUser()).name || '';
      console.log(this.username + " has been authenticated.");
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
