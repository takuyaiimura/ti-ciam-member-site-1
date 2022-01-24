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

@Injectable({
  providedIn: 'root'
})
export class OktaGetfactorService {
  strThisUserFactorInfo;
  strThisUserID;
  arrFactors: any = {};
  // inFactors;
  strOktaPushURL;

  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  constructor(public OktaSDKAuthService: OktaSDKAuthService, public OktaConfig: OktaConfig, public OktaApiEndpoints: OktaApiEndpoints,
    private cookieService: CookieService) { }


  async GetFactors(url, token) {
    this.cookieService.delete('okta_push_url')
    const FactorFetch = fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
      },

    })
      .then(response => response.json())
    this.arrFactors = await FactorFetch;
    // console.log(this.strThisUserFactorInfo);
    // this.arrFactors = this.strThisUserFactorInfo;
    console.log('List factors');
    console.log(this.arrFactors);
    for (var i = 0; i < this.arrFactors.length; i++) {
      //console.log(this.arrFactors[i].id)

      // Find push factor
      switch (this.arrFactors[i].factorType) {
        case "push":
          //Check whether the provider is Okta
          if (this.arrFactors[i].provider = "OKTA") {
            console.log('Okta Verify Push URL : ' + this.arrFactors[i]._links.verify.href);
            this.strOktaPushURL = this.arrFactors[i]._links.verify.href;
            console.log(this.strOktaPushURL);
            this.cookieService.set('okta_push_url',this.strOktaPushURL);
          }
          break;
        default:
          break;
      }
    }
  }



}


