import { Component, OnInit, Inject } from '@angular/core';

import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { ApiService } from '../api.service';
import { CartService } from '../cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private isAuthenticated: boolean = false;
  orders!: Order[];
  
  private name: string = '';
  private email: string = '';
  private ordernum: number = 0;
  private orderdesc: string = '';
  private date: number = 0;
  private paid: boolean = false;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService) {
    this.oktaAuth.authStateManager.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  async ngOnInit() {
    if (this.isAuthenticated) {
      this.name = (await this.oktaAuth.getUser()).name || '';
      this.email = (await this.oktaAuth.getUser()).email || '';

      this.api.getOrderHistory(this.name).subscribe(data => {
        this.orders = data;
      })
    }
  }

  completeOrder() {
    // this.api.postOrderHistory(this.httpOptions);
  }

}