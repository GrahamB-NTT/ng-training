import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

import { ApiService } from '../api.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {

  isAuthenticated: boolean = false;
  products!: Product[]

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      this.api.getProductByCategory('access').subscribe(data => {
        console.log(data);
        this.products = data;
      })
    }
  }

  addToCart(product: any) {
    this.cartServe.addToCart(product);
  }
}
