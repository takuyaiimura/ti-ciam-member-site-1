import { Component, OnInit } from '@angular/core';
import {  ProductStock, products} from 'app/shoppingcart/product-stock/product-stock';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartService } from 'app/shoppingcart/cart.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js';
import { CookieService } from 'ngx-cookie-service';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotLoggedInNotificationComponent } from 'app/not-logged-in-notification/not-logged-in-notification.component';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints';

@Component({
  selector: 'app-swagstore',
  templateUrl: './swagstore.component.html',
  styleUrls: ['./swagstore.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SwagstoreComponent implements OnInit {
  private authService = new OktaAuth(this.oktaSDKAuth.config);
  strThisSession;
  strUserSession: Boolean;
  durationInSeconds = 5;
  
  products = products;
  constructor(private cartService: CartService,private OktaConfig: OktaConfig, private cookieService: CookieService,private oktaSDKAuth: OktaSDKAuthService,private _snackBar: MatSnackBar,private OktaApiEndpoints: OktaApiEndpoints) { }

  addToCart(product: ProductStock) {
    this.cartService.addToCart(product);
    //window.alert('Your product has been added to the cart!');
  }
  
  openSnackBar() {
    this._snackBar.openFromComponent(NotLoggedInNotificationComponent,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',

      });
    window.location.replace(this.oktaSDKAuth.config.redirectUri);
  }
  

  async ngOnInit() {
    this.cookieService.delete('okta_current_user');
    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })

    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          //console.log('Session to Okta : ' + exists);
          return exists
        } else {
          // not logged in
          //console.log(exists);
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        this.openSnackBar()

      case true:
    }
  }

}
