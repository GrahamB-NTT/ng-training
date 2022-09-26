import { Component, OnInit, Inject } from '@angular/core';
import { formatDate } from '@angular/common';

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

  public orders!: Order[];
  public cart: any = [];
  public grandTotal: string = '';
  public pageString: string = 'empty';
  
  public Customer_Name: string = '';
  public Customer_Email: string = '';
  public Order_Number: number = 0;
  public Order_Description: string = '';
  public Transaction_Date: String = '';
  public Paid: boolean = false;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private api: ApiService, private cartServe: CartService) { }

  async ngOnInit() {
      this.cartServe.getProducts().subscribe(result => {
        if (result.length > 0) {
          this.pageString = 'checkout';
        }

        this.cart = result;
        this.grandTotal = this.cartServe.getTotalPrice().toFixed(2);
      });

      this.Customer_Name = (await this.oktaAuth.getUser()).name || '';
      this.Customer_Email = (await this.oktaAuth.getUser()).email || '';
  }

  completeOrder() {
    this.Transaction_Date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  
    for (var i = 0; i < this.cart.length; i++) {
      this.Order_Description += this.cart[i].title
      if (i != this.cart.length - 1) {
        this.Order_Description += ', ';
      }
    }

    this.api.getAllOrders().subscribe(data => {
      this.orders = data;
      this.Order_Number = +(this.orders[this.orders.length - 1].Order_Number) + 1;
    })

    this.api.postOrderHistory(JSON.stringify(
      [
        this.Customer_Name, 
        this.Customer_Email, 
        this.Order_Number, 
        this.Order_Description, 
        this.Transaction_Date, 
        this.Paid
      ]
    ))

    this.cartServe.removeAllCartItems();
    
    this.pageString = 'thanks';
  }
}