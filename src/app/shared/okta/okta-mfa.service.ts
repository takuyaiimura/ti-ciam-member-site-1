import { Injectable } from '@angular/core';
import { OktaSDKAuthService } from './okta-auth-service';
import { OktaConfig } from './okta-config';
import { OktaApiEndpoints } from './okta-api-endpoints';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { CookieService } from 'ngx-cookie-service';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';



@Injectable({
  providedIn: 'root'
})
export class OktaMfaService {
  MFAVerification;
  arrPollResponse;


  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  constructor(public OktaSDKAuthService: OktaSDKAuthService, public OktaConfig: OktaConfig, public OktaApiEndpoints: OktaApiEndpoints, private CookieService: CookieService, public OktaWidgetService: OktaWidgetService) { }


  async DoWidgetMFA(username) {
    this.MFAVerification = false;
    this.OktaWidgetService.CloseWidget();
    const transaction = await this.authService.signIn({ username });
    const strstateToken = transaction.data.stateToken;

    await this.OktaWidgetService.login(strstateToken);
    console.log('Widget MFA done : ' + String(this.OktaWidgetService.strMFAStatus));
  }


  async DoVerification(url, username, stateToken) {
    const SendOktaPush = fetch(url, {
      method: 'POST',
      body: JSON.stringify({ "stateToken": stateToken, "username": username, "scope": this.OktaConfig.strScope }),
      //body: JSON.stringify({ "stateToken": stateToken, "username": username }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

    })
      // .then(response => response.json())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error));
    console.log('Verification sent')
    //console.log(SendOktaPush);
    //this.arrInitialMFARequestResponse.__zone_symbol__value._embedded.factor.profile.name = SendOktaPush;
  }


  async PollMFAStatus(url, stateToken) {
    this.MFAVerification = false;
    var intPoll = Number('0');
    //outerloop:   
    for (intPoll = 0; intPoll < 10; intPoll++) {
      await this.RequestSpacer(4);
      const PostforPoll = fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "stateToken": stateToken }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

      }).then(response => response.json())
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
      this.arrPollResponse = await PostforPoll;
      console.log(this.arrPollResponse);
      console.log(this.arrPollResponse.status);

      switch (this.arrPollResponse.status) {
        case "SUCCESS": {
          this.MFAVerification = true;
          console.log("verify : " + this.MFAVerification);
          break;

        }
      }
      console.log("verify : " + this.MFAVerification);
      if (this.MFAVerification === true) {
        return;
      }

    }
  }

  async RequestSpacer(sec) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec * 1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  }



}


// for (i = 0; mfaItems.length > i; i += 1) {
//   if (mfaItems[i].value === mfaName) {
//     //this.mfaImagePath = mfaItems[i].imagePath;
//     return mfaItems[i].id;
//   }
// }


// async function main() {
//   try {
//     await wait(10); // ここで10秒間止まります

//     // ここに目的の処理を書きます。

//   } catch (err) {
//     console.error(err);
//   }
// }

// this.CookieService.delete('okta_statetoken');
//     this.CookieService.delete('okta_push_url');





      // else {
      //   console.log('Not verified');    
      // }
      // if (intPoll = 5){
      //   // this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
      //   //localStorage.removeItem('okta_swags');
      //   // localStorage.removeItem('okta_swag_total');
      //   // document.getElementById("welcomeText").innerHTML = " "
      //   // this.CookieService.deleteAll();
      // }
