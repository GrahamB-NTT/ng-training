import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

import { ApiService } from '../api.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent implements OnInit {

  isAuthenticated: boolean = false;
  public products!: Product[]

  bag: boolean = true;
  indycar: boolean = true;
  lanyard: boolean = true;
  mug: boolean = true;
  supplies: boolean = true;
  recreational: boolean = true;
  technology: boolean = true;
  strung: string = '';

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
        this.api.getProductByCategory('access').subscribe(data => {
          this.products = data;
        })
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

  onChange() {
    this.products = [];
    this.strung = '';

    if (this.bag) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.indycar) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.lanyard) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.mug) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.supplies) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.recreational) { this.strung += '1'; } else { this.strung += '0'; }
    if (this.technology) { this.strung += '1'; } else { this.strung += '0'; }

    this.api.getTypedAccessories(this.strung).subscribe(data => {
      this.products = data;
    })
  }
}
