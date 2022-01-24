import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { GetUserinfoService } from 'app/shared/okta/get-userinfo.service';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmorderComponent } from 'app/confirmorder/confirmorder.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmptycartComponent } from 'app/emptycart/emptycart.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class CheckoutComponent implements OnInit {


  // セレクトタグのフォームの部品となる「月」の配列
  public monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // セレクトタグのフォームの部品となる「年」の配列
  public yearList = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

  public paymentForm: FormGroup;

  panelOpenState = true;
  private authService = new OktaAuth(this.oktaSDKAuth.config);
  strThisSession;
  strUserSession: Boolean;
  durationInSeconds = 5;
  strCheckoutTotal;
  arrShoppingitems: any = {};
  public newZip;
  public newAddress;
  public newLocality
  strNewZip;
  strNewAddress;
  strNewLocality;
  arrNewUserInfo: any = {};
  myUserID;
  ;

  constructor(public CookieService: CookieService, public oktaSDKAuth: OktaSDKAuthService,
    public _snackBar: MatSnackBar, public OktaApiEndpoints: OktaApiEndpoints,
    public OktaConfig: OktaConfig, public GetUserinfoService: GetUserinfoService,
    public ConfirmorderComponent: ConfirmorderComponent,
    public _matdialog: MatDialog, public EmptycartComponent: EmptycartComponent,
    private formBuilder: FormBuilder) { }

  async cartEmtpy() {
    this._snackBar.openFromComponent(EmptycartComponent,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',

      });
  }

  async openSnackBar() {
    this._snackBar.openFromComponent(NotLoggedInNotificationComponent,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',

      });
  }

  cardForm() {
    this.paymentForm = this.formBuilder.group({
      'cardNumber': ['', [Validators.required]],
      'expiration_month': ['', [Validators.required]],
      'expiration_year': ['', [Validators.required]]
    })
  }

  async ngOnInit() {
    this.cardForm();
    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })

    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        await this.openSnackBar();
        window.location.replace(this.oktaSDKAuth.config.redirectUri);
        break;
      case true:

        this.GetUserinfoService.GetUserInfo();
        this.GetItems();
        console.log(this.strCheckoutTotal)
        //If there are no swags in the cart, then go back to the swag shop
        if (this.strCheckoutTotal == 'undefined') {
          this.cartEmtpy();
          window.location.replace('/store')
        }

        break;
    }
  }

  async GetItems() {
    this.strCheckoutTotal = localStorage.getItem('okta_swag_total');
    this.arrShoppingitems = JSON.parse(localStorage.getItem('okta_swags'));
    console.log(this.arrShoppingitems);
  }



  ConfirmOrder() {
    this.myUserID = this.GetUserinfoService.strUserID;

    if (this.myUserID == null) {
      alert("Error, redirecting you back to the home page")
      this.CookieService.delete('okta_swag_order_flag')
      window.location.replace(this.OktaConfig.strPostLogoutURL);
    }
    console.log(this.myUserID);

    this.strNewZip = this.newZip;
    this.strNewAddress = this.newAddress;
    this.strNewLocality = this.newLocality;

    if (this.newZip == null) {
      //If a new zip was not entered, use the zip code retrieved from Okta      
      this.strNewZip = this.GetUserinfoService.UserZip;
    }

    if (this.newAddress == null) {
      //If a new zip was not entered, use the zip code retrieved from Okta
      this.strNewAddress = this.GetUserinfoService.UserStreetAddress;
    }

    if (this.newLocality == null) {
      //If a new zip was not entered, use the zip code retrieved from Okta
      this.strNewLocality = this.GetUserinfoService.UserLocality;
    }

    this.arrNewUserInfo = [{
      id: this.myUserID,
      profile:
      {
        streetAddress: this.strNewAddress,
        city: this.strNewLocality,
        zipCode: this.strNewZip,
      }

    }];
    this.CookieService.set('okta_swag_order_flag', 'true')
    localStorage.setItem('okta_swag_user_info', JSON.stringify(this.arrNewUserInfo[0]));
    const confirmOrderDialog = new MatDialogConfig();
    confirmOrderDialog.id = "ConfirmorderComponent";
    confirmOrderDialog.width = "450px";
    const modalDialog = this._matdialog.open(ConfirmorderComponent, confirmOrderDialog);
    
    
    
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.id = "login-component";
    // //dialogConfig.height = "100px";
    // dialogConfig.width = "450px";
    // dialogConfig.disableClose = true;
    // const modalDialog = this._matdialog.open(SaveModalComponent, dialogConfig);
  }


}
