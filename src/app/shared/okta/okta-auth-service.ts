import { Injectable } from '@angular/core';
import { OktaAuth } from "@okta/okta-auth-js";
import {OktaConfig} from 'app/shared/okta/okta-config';


@Injectable({
  providedIn: 'root'
})
export class OktaSDKAuthService {
  constructor(private OktaConfig: OktaConfig  ){ }

    config = {
        clientId: this.OktaConfig.strClientID,
        issuer: this.OktaConfig.strIssuer,
        redirectUri: this.OktaConfig.strRedirectURL,
        postLogoutRedirectUri:this.OktaConfig.strRedirectURL,
        responseMode: this.OktaConfig.strResponseMode,
        responseType: this.OktaConfig.strResponseType,
        scopes: this.OktaConfig.strScope,
        prompt: this.OktaConfig.strPrompt,

    };

    OktaSDKAuthClient = new OktaAuth(this.config);    

    
  }
  