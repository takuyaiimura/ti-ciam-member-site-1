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
export class OktaGetStatetokenService {

  strStateToken;
  strState;
  strOktaPushURL;
  BolOktaPushExists: Boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  constructor(public OktaSDKAuthService: OktaSDKAuthService, public OktaConfig: OktaConfig, public OktaApiEndpoints: OktaApiEndpoints,
    private CookieService: CookieService) { }

  async GetStateToken(user) {

    this.CookieService.delete('okta_statetoken');
    this.CookieService.delete('okta_push_url');

    const StateTokenGet = fetch(this.OktaConfig.strBaseURI + '/api/v1/authn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "username": user }),
    })
      .then(response => response.json())
    this.strState = await StateTokenGet;
    console.log(this.strState);
    //this.CookieService.set('okta_statetoken', JSON.stringify(this.strState));
    //this.strOktaPushURL = this.strState._embedded.factors[0]._links.verify.href;
    //console.log(this.strOktaPushURL);
    this.strStateToken = this.strState.stateToken;
    console.log(this.strStateToken);
    this.CookieService.set('okta_statetoken', JSON.stringify(this.strStateToken));
    //console.log(this.strOktaPushURL.length);
    //console.log(this.strState._embedded.factors.length)
    for (var i = 0; i < this.strState._embedded.factors.length; i++) {
      //console.log(this.strState._embedded.factors[i].factorType);
      if (this.strState._embedded.factors[i].factorType = "push") {
        switch (this.strState._embedded.factors[i].provider) {
          case 'OKTA':
            this.BolOktaPushExists = true;
            this.strOktaPushURL = this.strState._embedded.factors[i]._links.verify.href;
            console.log(this.strOktaPushURL);
            this.CookieService.set('okta_push_url', JSON.stringify(this.strOktaPushURL));
            break;
          default:
            this.BolOktaPushExists = false;
            break;

        }
      }

    }   

  }

}
