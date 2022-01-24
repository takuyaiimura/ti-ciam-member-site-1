import { Component, OnInit, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotLoggedInNotificationComponent } from 'app/not-logged-in-notification/not-logged-in-notification.component';
import { OktaConfig } from "app/shared/okta/okta-config";

//declare const OktaWidget: any;
//declare const RemoveLoginWidget: any;

@Component({
  selector: 'app-widget-modal',
  templateUrl: './widget-modal.component.html',
  styleUrls: ['./widget-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetModalComponent implements OnInit {
  private authService = new OktaAuth(this.oktaSDKAuth.config);
  strUserSession;

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(NotLoggedInNotificationComponent,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center',

      });
    window.location.replace(this.oktaSDKAuth.config.redirectUri);
  }

  constructor(public _dialogRef: MatDialogRef<WidgetModalComponent>, private widgetLogin: OktaWidgetService, private oktaSDKAuth: OktaSDKAuthService, private _snackBar: MatSnackBar, public OktaConfig:OktaConfig) {
  }
  // Close the dialog
  closeModal() {
    this._dialogRef.close();
    this.widgetLogin.CloseWidget();

  }
  async ngOnInit() {
    this.widgetLogin.CloseWidget();
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log('Session to Okta : ' + exists);
          return exists
        } else {
          // not logged in
          console.log('Session to Okta : ' + exists);
          return exists
        }
      });
    switch (this.strUserSession) {
      case false:
        this.widgetLogin.login("");
        break;

      case true:
        window.location.replace(this.oktaSDKAuth.config.redirectUri);
        break;

    }
  }

}


