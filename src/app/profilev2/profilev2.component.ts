import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/shared/okta/okta-authentication";
//import { OktaAuth } from "@okta/okta-auth-js";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotLoggedInNotificationComponent } from 'app/not-logged-in-notification/not-logged-in-notification.component';
//import { ComponentsModule } from 'app/components/components.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints';
import { OktaConfig } from "app/shared/okta/okta-config";
import { SelectucComponent } from 'app/selectuc/selectuc.component';
import { CookieService } from 'ngx-cookie-service';
import { MatInputModule } from '@angular/material/input';
import { GetUserinfoService } from 'app/shared/okta/get-userinfo.service';
import { ConfirmorderComponent } from 'app/confirmorder/confirmorder.component';

@Component({
  selector: 'app-profilev2',
  templateUrl: './profilev2.component.html',
  styleUrls: ['./profilev2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Profilev2Component implements OnInit {
  public authService = new OktaAuth(this.oktaSDKAuth.config);
  strThisSession;
  strUserSession: Boolean;
  durationInSeconds = 5;
  strUser;
  strUserID;
  strWorkforce;
  strCiam;
  myNewAddress;
  myNewCity;
  myNewZip;
  arrUserInformation;

  constructor(public oktaSDKAuth: OktaSDKAuthService, fb: FormBuilder, public _matdialog: MatDialog, public _snackBar: MatSnackBar,
    public OktaApiEndpoints: OktaApiEndpoints, public OktaConfig: OktaConfig, public cookieService: CookieService, public GetUserinfoService: GetUserinfoService, public ConfirmorderComponent: ConfirmorderComponent) { }

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
        // access and ID tokens are retrieved automatically from the TokenManager
        this.authService.token.getWithoutPrompt()
          .then(function (user) {
            // user has details about the user
            //console.log(user)
            return user;
            //return Promise.resolve(this.authService);
          })
          .catch(function (err) {
          });
        ///Assign information from the token to the user variable
        this.strThisSession = await this.authService.token.getWithoutPrompt();
        this.GetUserinfoService.GetMe(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strUserMe, this.strThisSession.tokens.accessToken.accessToken);
    }
  }

  WFChecked: boolean;
  WFonChange(item) {
    this.strWorkforce = item.checked;
    console.log('Workforce was set to : ' + this.strWorkforce);
  }

  ciamChecked: boolean;
  CIAMonChange(item) {
    this.strCiam = item.checked;
    console.log('CIAM was set to : ' + this.strCiam);
  }


  // //////////////////
  // Save
  // //////////////////
  saveModal() {
    if ((this.strCiam == false && this.strWorkforce == false)) {
      console.log('Select uc')
      const dialogUC = new MatDialogConfig();
      dialogUC.id = "SelectucComponent";
      dialogUC.height = "200px";
      dialogUC.width = "450px";
      const modalDialog = this._matdialog.open(SelectucComponent, dialogUC);
    }
    else {

      this.arrUserInformation = [{
        id: this.strUserID,
        profile:
        {
          ciam: this.strCiam,
          workforce: this.strWorkforce,
          streetAddress: this.myNewAddress,
          city: this.myNewCity,
          zipCode: this.myNewZip,
        }
      }];
      this.cookieService.set('okta_current_user', JSON.stringify(this.arrUserInformation[0]));
      // const dialogConfig = new MatDialogConfig();
      // dialogConfig.id = "login-component";
      // //dialogConfig.height = "100px";
      // dialogConfig.width = "450px";
      // dialogConfig.disableClose = true;
      // const modalDialog = this._matdialog.open(SaveModalComponent, dialogConfig);
      const confirmOrderDialog = new MatDialogConfig();
      confirmOrderDialog.id = "ConfirmorderComponent";
      confirmOrderDialog.width = "450px";
      confirmOrderDialog.disableClose = true;
      const modalDialog = this._matdialog.open(ConfirmorderComponent, confirmOrderDialog);
    }
  }

  addressUpdated(event) {
    console.log("New address is : ", event.target.value);
    this.myNewAddress = event.target.value;

  }

  cityUpdated(event) {
    console.log("New city is : ", event.target.value);
    this.myNewCity = event.target.value;
  }

  zipUpdated(event) {
    console.log("New zip is : ", event.target.value);
    this.myNewZip = event.target.value;
  }

}
