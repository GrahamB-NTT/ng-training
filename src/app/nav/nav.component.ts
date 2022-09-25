import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  public totalItem: number = 0;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private router: Router, private cartServe: CartService) {
    this.oktaAuth.authStateManager.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
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
