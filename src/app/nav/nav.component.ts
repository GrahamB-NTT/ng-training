import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

interface Category {
  value: string;
  viewValue: string;
  image: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  username: string = '';

  categories: Category[] = [
    { value: 'https://myaccount.microsoft.com/?ref=MeControl', viewValue: 'My Profile', image: '../../assets/logos/proIcon.png' },
    { value: '/login', viewValue: 'Logout', image: '../../assets/logos/logoutIcon.png' }
  ]

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private router: Router) {
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

  navigateTo(val) {
    if (val.charAt(0) === 'h') {
      window.location.href = val;
    } else if (val.charAt(0) === '/') {
      if (val === '/login') {
        this.logout();
        return;
      }
      this.router.navigate([val]);
    }
  }
}
