import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean = false;
  username: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.username = userClaims.name || '';
    }
  }

}
