import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {

  private product = new Product;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, public cartServe: CartService) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('30em')
  }

  addToCart(data: any) {
    this.product.id = data.id;
    this.product.title = data.title;
    this.product.price = data.price;
    this.product.image = data.image;

    this.cartServe.addToCart(this.product);
  }
}