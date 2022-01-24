import { Injectable } from '@angular/core';
import { OktaSDKAuthService } from './okta-auth-service'
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'

@Injectable({
  providedIn: 'root'
})
export class OktaGetTokenService {
  myAccessToken;
  private authService = new OktaAuth(this.oktaSDKAuth.config);
  constructor(private oktaSDKAuth: OktaSDKAuthService) { }


  strUserName;
  async GetAccessToken() {
    const accessToken: AccessToken = await this.authService.tokenManager.get('accessToken') as AccessToken;
    //this.myUserID = accessToken.claims.uid;
    this.myAccessToken = accessToken;
    console.log('From GetAccessToken Service');
    console.log(this.myAccessToken.accessToken);
    this.strUserName = this.myAccessToken.claims.sub;
    console.log("username for the stateToken : " + this.strUserName);

  }

}
