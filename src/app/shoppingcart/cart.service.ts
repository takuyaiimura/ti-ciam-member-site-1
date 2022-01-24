import { Injectable } from '@angular/core';
import { ProductStock } from 'app/shoppingcart/product-stock/product-stock';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ProductStock[] = [];
  strPrice;
  //strTotal;
  intItemCount;

  constructor() { }


  addToCart(product: ProductStock) {

    this.items.push(product);
    this.strPrice = 0;
    this.intItemCount = 0;
    for (var i = 0; i < this.items.length; i++) {
      this.strPrice = this.strPrice + this.items[i].price;
    }

    this.intItemCount = this.items.length;
    console.log("Current Toal : " + this.strPrice)
    console.log('Number of items : ' + this.intItemCount);
    
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    // return this.items;
  }


}
