import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
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

  checkSelected(type: String) {
    if (type === 'bag' && this.bag) {
      return true;
    } else if (type === 'indycar' && this.indycar) {
      return true;
    } else if (type === 'lanyard' && this.lanyard) {
      return true;
    } else if (type === 'mug' && this.mug) {
      return true;
    } else if (type === 'supplies' && this.supplies) {
      return true;
    } else if (type === 'recreational' && this.recreational) {
      return true;
    } else if (type === 'technology' && this.technology) {
      return true;
    } else {
      return false;
    }
  }
}
