import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuth } from "@okta/okta-auth-js";
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { OktaConfig } from "app/shared/okta/okta-config";
//import { FooterComponent } from "../footer/footer.component";

@Injectable({
  providedIn: 'root'
})
export class OktaWidgetService {
  private authClient = new OktaAuth({
    issuer: this.OktaConfig.strIssuer,
    clientId: this.OktaConfig.strClientID,
  });
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public strstateToken;
  public oktaSignIn;
  public idToken;
  public LogoutURI = this.OktaConfig.strPostLogoutURL;
  public strMFAStatus;

  constructor(private router: Router, private OktaConfig: OktaConfig) { }

  async checkAuthenticated() {
    const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(strState) {
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
    const OktaWidgetLogo = this.OktaConfig.strLogo;
    var oktaSignIn = new OktaSignIn({
      logo: OktaWidgetLogo,
      clientId: OktaClientID,
      baseUrl: OktaBaseURI,
      language: OktaLang,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      stateToken: strState,
      postLogoutRedirectUri: OktaPostlogoutURI,
      authParams: {
        issuer: OktaIssuer,
        responseMode: 'fragment',
        responseType: OktaResType,
        scopes: OktaScope,
        pkce: false,
        prompt: OktaResMode
      },
      
    });
    console.log(OktaScope)
    var myMFADone = await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {

      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      oktaSignIn.remove();
      const idToken = tokens.idToken;
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace(OktaRedirect);
      return true;

    }).catch(function (err) {
      console.error(err);
      return false;
    });
    //console.log('MFA Status : ' + myMFADone)
    this.strMFAStatus = myMFADone;
  }

  
 
CloseWidget() {
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
  var oktaSignIn = new OktaSignIn({
    clientId: OktaClientID,
    baseUrl: OktaBaseURI,
    language: OktaLang,
    redirectUri: OktaRedirect,
    colors: {
      brand: OktaBrand,
    },
    postLogoutRedirectUri: OktaPostlogoutURI,
    authParams: {
      issuer: OktaIssuer,
      responseMode: 'fragment',
      responseType: OktaResType,
      scopes: OktaScope,
      pkce: false,
      prompt: OktaResMode
    },
  });
  oktaSignIn.remove();

}

  // async SaveMFA() {
  //   const OktaClientID = this.OktaConfig.strMFAClientID;
  //   const OktaBaseURI = this.OktaConfig.strBaseURI;
  //   const OktaLang = this.OktaConfig.strLang;
  //   const OktaRedirect = this.OktaConfig.strRedirectURL;
  //   const OktaBrand = this.OktaConfig.strBrand;
  //   const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
  //   const OktaIssuer = this.OktaConfig.strIssuer;
  //   const OktaScope = this.OktaConfig.strScope;
  //   const OktaResType = this.OktaConfig.strResponseType;
  //   const OktaResMode = this.OktaConfig.strResponseMode;
  //   const OktaWidgetLogo = this.OktaConfig.strLogo;
  //   var oktaSignIn = new OktaSignIn({
  //     logo: OktaWidgetLogo,
  //     clientId: OktaClientID,
  //     baseUrl: OktaBaseURI,
  //     language: OktaLang,
  //     redirectUri: OktaRedirect,
  //     colors: {
  //       brand: OktaBrand,
  //     },
  //     postLogoutRedirectUri: OktaPostlogoutURI,
  //     authParams: {
  //       issuer: OktaIssuer,
  //       responseMode: 'fragment',
  //       responseType: OktaResType,
  //       scopes: OktaScope,
  //       pkce: false,
  //       prompt: OktaResMode
  //     },
  //   });

  //   oktaSignIn.showSignInToGetTokens({
  //     el: '#okta-signin-container'
  //   }).then(function (tokens) {

  //     oktaSignIn.authClient.tokenManager.setTokens(tokens);
  //     oktaSignIn.remove();

  //     const idToken = tokens.idToken;
  //     const accessToken = tokens.accessToken;
  //     console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");

  //     return oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
  //       .then(function (user) {        

  //         window.location.replace(window.location.origin);

  //       })
  //       .catch(function (err) {
  //         // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
  //       });

  //   }).catch(function (err) {
  //     console.error(err);
  //   });
  // }

}



// async login(state) {
  //   const OktaClientID = this.OktaConfig.strClientID;
  //   const OktaBaseURI = this.OktaConfig.strBaseURI;
  //   const OktaLang = this.OktaConfig.strLang;
  //   const OktaRedirect = this.OktaConfig.strRedirectURL;
  //   const OktaBrand = this.OktaConfig.strBrand;
  //   const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;
  //   const OktaIssuer = this.OktaConfig.strIssuer;
  //   const OktaScope = this.OktaConfig.strScope;
  //   const OktaResType = this.OktaConfig.strResponseType;
  //   const OktaResMode = this.OktaConfig.strResponseMode;
  //   const OktaWidgetLogo = this.OktaConfig.strLogo;
  //   var oktaSignIn = new OktaSignIn({
  //     logo: OktaWidgetLogo,
  //     stateToken: state,
  //     clientId: OktaClientID,
  //     baseUrl: OktaBaseURI,
  //     language: OktaLang,
  //     redirectUri: OktaRedirect,
  //     colors: {
  //       brand: OktaBrand,
  //     },
  //     postLogoutRedirectUri: OktaPostlogoutURI,
  //     authParams: {
  //       issuer: OktaIssuer,
  //       responseMode: 'fragment',
  //       responseType: OktaResType,
  //       scopes: OktaScope,
  //       pkce: false,
  //       prompt: OktaResMode
  //     },
  //   });

  //   oktaSignIn.authClient.token.getUserInfo().then(function (user) {
  //     console.log("Hello, " + user.email + "! You are *still* logged in! :)");
  //   }, function (error) {
  //     oktaSignIn.showSignInToGetTokens({
  //       el: '#okta-signin-container'
  //     }).then(function (tokens) {
  //       oktaSignIn.authClient.tokenManager.setTokens(tokens);
  //       oktaSignIn.remove();

  //       const idToken = tokens.idToken;
  //       const accessToken = tokens.accessToken;
  //       console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
  //       window.location.replace(OktaRedirect);
  //       // console.log(idToken);
  //       // console.log(accessToken);
  //       return oktaSignIn.authClient.token.getUserInfo(accessToken, idToken)
  //         .then(function (user) {
  //           // user has details about the user
  //           //console.log(user);
  //           // console.log(JSON.stringify(user));
  //           //window.location.replace(OktaRedirect);
  //           // window.location.replace(this.OktaConfig.strRedirectURL);
  //         })
  //         .catch(function (err) {
  //           // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
  //         });

  //     }).catch(function (err) {
  //       console.error(err);
  //     });
  //   });

  //