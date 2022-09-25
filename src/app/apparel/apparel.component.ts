import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

import { ApiService } from '../api.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-apparel',
  templateUrl: './apparel.component.html',
  styleUrls: ['./apparel.component.scss']
})

export class ApparelComponent implements OnInit {

  isAuthenticated: boolean = false;
  apparelString: string = '';
  products!: Product[];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  onSelectMen() {
    this.apparelString = 'men';

    this.api.getProductByCategory(this.apparelString).subscribe(data => {
      this.products = data;
    })
  }
  onSelectWomen() {
    this.apparelString = 'women';

    this.api.getProductByCategory(this.apparelString).subscribe(data => {
      this.products = data;
    })
  }
  onSelectPride() {
    this.apparelString = 'neutral';

    this.api.getProductByCategory(this.apparelString).subscribe(data => {
      this.products = data;
    })
  }

  onSelectMain() {
    this.apparelString = '';
    this.products = [];
  }

  addToCart(product: any) {
    this.cartServe.addToCart(product);
  }
}
