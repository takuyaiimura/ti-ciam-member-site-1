import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfig } from "app/shared/okta/okta-config";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: "root"
})



export class AuthService {
  secondsSinceEpoch;


  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;

  constructor(private router: Router, private OktaConfig: OktaConfig, public cookieService: CookieService) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string) {

    const transaction = await this.authClient.signIn({ username, password });

    var element = document.getElementById("loginpage");
    element.parentNode.removeChild(element);

    this.strstateToken = transaction.data.stateToken;
    console.log(JSON.stringify(this.strstateToken));
    //Uses the state token to perform MFA authentication using a newly created widget
    const OktaClientID = this.OktaConfig.strClientID;
    const OktaBaseURI = this.OktaConfig.strBaseURI;
    const OktaLang = this.OktaConfig.strLang;
    const OktaRedirect = this.OktaConfig.strRedirectURL;
    const OktaBrand = this.OktaConfig.strBrand;
    const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
    const OktaIssuer = this.OktaConfig.strIssuer;
    const OktaScope = this.OktaConfig.strScope;
    const OktaResType = this.OktaConfig.strResponseType;
    const OktaResMode = this.OktaConfig.strResponseMode;
    const OktaPkce = this.OktaConfig.strPkce;
    const OktaPrompt = this.OktaConfig.strPrompt;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      stateToken: this.strstateToken,
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: OktaResMode,
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: OktaPkce,
        prompt: OktaPrompt
      },
    });

    oktaSignIn.authClient.token.getUserInfo().then(function (user) {
      console.log("Hello, " + user.email + "! You are *still* logged in! :)");
      //document.getElementById("logout").style.display = 'block';
    }, function (error) {
      oktaSignIn.showSignInToGetTokens({
        el: '#okta-widget-container'
      }).then(function (tokens) {
        oktaSignIn.authClient.tokenManager.setTokens(tokens);
        oktaSignIn.remove();

        const idToken = tokens.idToken;
        const accessToken = tokens.accessToken;
        console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");

        return oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
          .then(function (user) {
            // user has details about the user            
            //window.location.replace(window.location.origin);
            window.location.replace(OktaRedirect);
            //console.log('Logged in time now : ' + loggedinTime)
            //window.location.replace(this.OktaConfig.strRedirectURL);
          })
          .catch(function (err) {
            // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
          });
        
      }).catch(function (err) {
        console.error(err);
      });

    });
  }

  OktaLogout(bar?: string) {

    this.authClient.tokenManager.clear();
    this.authClient.signOut({ postLogoutRedirectUri: this.LogoutURI, idToken: this.idToken });
    location.reload();
  }

}


