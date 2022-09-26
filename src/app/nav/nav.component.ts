import { Component, Inject, OnInit } from '@angular/core';

import {OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { User } from '../user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  public totalItem: number = 0;
  public profile!: User[];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService) {
    this.oktaAuth.authStateManager.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      this.api.getUserById((await this.oktaAuth.getUser()).name).subscribe(result => {
        this.profile = result;
      });

      this.cartServe.getProducts().subscribe(result => {
        this.totalItem = result.length;
      })
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }

  navigateTo(val) {
    window.location.href = val;
  }
}
