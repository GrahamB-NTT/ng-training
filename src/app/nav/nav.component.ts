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
      this.getUserDetails();
      console.log(this.username + " has been authenticated.");
    }
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
        (result) => {
          this.username = result.name!;
        }
      )
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }

}
