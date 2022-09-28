import { Component, OnInit, Inject } from '@angular/core';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean = false;
  username: string = '';
  products!: Product[];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      this.api.getPopularProducts().subscribe(data => {
        this.products = data;
      });

      const userClaims = await this.oktaAuth.getUser();
      this.username = userClaims.name || '';
    }
  }

  addToCart(product: any) {
    this.cartServe.addToCart(product);
  }

  openDialog(idx, titlex, pricex, imagex) {
    this.dialog.open<PopupComponent, any>(PopupComponent, {
      data: {
        id: idx,
        title: titlex,
        price: pricex,
        image: imagex
      }
    })
  }
}
