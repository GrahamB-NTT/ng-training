import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

import { ApiService } from '../api.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  
  isAuthenticated: boolean = false;
  username: string = '';
  orders!: Order[];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.username = userClaims.name || '';

      this.api.getOrderHistory(this.username).subscribe(data => {
        console.log(data);
        this.orders = data;
      })
    }
  }
}