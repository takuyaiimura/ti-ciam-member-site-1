import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CartService } from 'app/shoppingcart/cart.service';
import { MatDividerModule } from '@angular/material/divider';

import {OktaConfig} from 'app/shared/okta/okta-config';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CartPageComponent implements OnInit {

  items = this.CartService.getItems();
  constructor(public CartService: CartService,  public OktaConfig:OktaConfig) { }

  ngOnInit(){
    localStorage.removeItem('okta_swags');
    localStorage.removeItem('okta_swag_total');
  }

  // emtpyCart() {
  //   // this.CartService.clearCart();
  //   // this.strTotal = this.CartService.getItems.
  // }

  checkoutCart(){
    localStorage.removeItem('okta_swags');
    localStorage.removeItem('okta_swag_total');

    localStorage.setItem('okta_swags',JSON.stringify(this.CartService.getItems()));
    localStorage.setItem('okta_swag_total',this.CartService.strPrice);


    //this.CookieService.set('okta_swags',JSON.stringify(this.CartService.getItems()));
    //this.CookieService.set('okta_swag_total',this.CartService.strPrice);
    window.location.replace(this.OktaConfig.strRedirectURL + 'checkout');
    
  }

}


