import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public product: any = []
  public grandTotal: string = '';
  emptyCart: boolean = false;
  
  constructor(private cartServe: CartService) { }

  ngOnInit(): void {
    this.cartServe.getProducts().subscribe(result => {
      if (result.length < 1) {
        this.emptyCart = true;
      }
      this.product = result;
      this.grandTotal = this.cartServe.getTotalPrice().toFixed(2);
    })
  }

  removeItem(entry) {
    this.cartServe.removeCartItem(entry);
  }

  clearCart() {
    this.cartServe.removeAllCartItems();
  }
}
