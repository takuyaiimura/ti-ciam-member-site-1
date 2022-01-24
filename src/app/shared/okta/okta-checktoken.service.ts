import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
//import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TokenexpireComponent } from 'app/tokenexpire/tokenexpire.component';

@Injectable({
  providedIn: 'root'
})
export class OktaChecktokenService {
  strIDToken;
  constructor(private OktaSDKAuthService: OktaSDKAuthService, public _matdialog: MatDialog) { }

  async openDialog(): Promise<number> {
    const dialogRef = this._matdialog.open(TokenexpireComponent, {disableClose: true}
      );
    return dialogRef.afterClosed()
      .toPromise() // here you have a Promise instead an Observable
      .then(result => {
        console.log("The dialog was closed " + result);
        
        return Promise.resolve(result); // will return a Promise here
      });
      

  }
  async functionCheckToken() {
    interval(1000 * 60).subscribe(x => {
      console.log('Start periodic token check')
      
      //Check the access token validity
      //Get the current time
      const secondsSinceEpoch = Math.round(Date.now() / 1000)
      console.log('Time now : ' + secondsSinceEpoch);

      //Get the token expiration time
      this.strIDToken = this.OktaSDKAuthService.OktaSDKAuthClient.tokenManager.getTokensSync().idToken;
      console.log('Expiration time on token : ' + this.strIDToken.expiresAt)

      if (Number(secondsSinceEpoch) > Number(this.strIDToken.expiresAt)) {
        //Perform logout if the token has expired  
        console.log('Your token has expired, logging you off')
        
        this.openDialog();
        stop();

      }
      else {
        //Token still valis actions
        console.log('Your token is still valid')
        
      }
    });
  }

}




