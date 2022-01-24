import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaConfig } from "app/shared/okta/okta-config";
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaApiEndpoints } from "app/shared/okta/okta-api-endpoints";
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
import { PostToOktaService } from 'app/shared/okta/post-to-okta.service';
import { ProfilesavedComponent } from 'app/profilesaved/profilesaved.component';
import { NotLoggedInNotificationComponent } from 'app/not-logged-in-notification/not-logged-in-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { OktaGetStatetokenService } from 'app/shared/okta/okta-get-statetoken.service';
import { CookieService } from 'ngx-cookie-service';
import { OktaMfaService } from 'app/shared/okta/okta-mfa.service'


@Component({
  selector: 'app-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmorderComponent implements OnInit {
  public strMFAStatus;
  strThisUser;
  myAccessToken;
  strWidgetStateToken;
  strOktaSwagFlag: boolean;
  strSwagUser;
  JSONUertoUpdate;
  private authService = new OktaAuth(this.OktaSDKAuthService.config);

  constructor(private OktaWidgetService: OktaWidgetService, private OktaConfig: OktaConfig,
    private OktaSDKAuthService: OktaSDKAuthService, private OktaApiEndpoints: OktaApiEndpoints,
    private PostToOktaService: PostToOktaService, private ProfilesavedComponent: ProfilesavedComponent, private _snackBar: MatSnackBar,
    public OktaGetStatetokenService: OktaGetStatetokenService, public OktaGetTokenService: OktaGetTokenService, public CookieService: CookieService, public OktaMfaService: OktaMfaService) { }

  BackHome() {
    this.authService.signOut();
    localStorage.removeItem('okta_swags');
    localStorage.removeItem('okta_swag_total');
    localStorage.removeItem('okta_new_user_info');
    document.getElementById("welcomeText").innerHTML = " "
    this.CookieService.deleteAll();
    localStorage.clear;
    this.CookieService.deleteAll();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(NotLoggedInNotificationComponent,
      {
        duration: 5 * 1000,
        horizontalPosition: 'center',
      });
  }
  openSavedSnackBar() {
    this._snackBar.openFromComponent(ProfilesavedComponent,
      {
        duration: 5 * 1000,
        horizontalPosition: 'center',
      });
  }

  async ngOnInit() {
    this.strMFAStatus = false;
    await this.OktaGetTokenService.GetAccessToken();
    console.log(this.OktaGetTokenService.strUserName);
    this.OktaWidgetService.CloseWidget();
    await this.OktaMfaService.DoWidgetMFA(this.OktaGetTokenService.strUserName);

    console.log('MFA Status : ' + String(this.OktaWidgetService.strMFAStatus))
    this.strMFAStatus = this.OktaWidgetService.strMFAStatus;
    //this.functionMFA(this.OktaGetTokenService.strUserName);
    await this.OktaGetTokenService.GetAccessToken();

    switch (String(this.strMFAStatus)) {
      case "true":
        document.getElementById("BackHome").style.visibility = "hidden";
        
        this.strOktaSwagFlag = this.CookieService.check('okta_swag_order_flag');
        
        console.log('Is there an Okta Swag flag? ' + this.strOktaSwagFlag)

        switch (String(this.strOktaSwagFlag)) {

          // For updating the swag shop user
          case "true":
            
            //Get the user information, and convert into JSON object
            const ThisUserArray = localStorage.getItem('okta_swag_user_info');
            console.log('User to update : ' + ThisUserArray);
            this.strSwagUser = JSON.parse(ThisUserArray);
            await this.PostToOktaService.PostUserInfo(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strUserMe, this.OktaGetTokenService.myAccessToken.accessToken, this.strSwagUser);
            //await this.OktaMfaService.RequestSpacer(2);
            localStorage.removeItem('okta_swag_user_info');
            localStorage.removeItem('okta_swag_total');
            localStorage.removeItem('okta_swags');
            this.CookieService.delete('okta_swag_order_flag');
            this.openSavedSnackBar();
            window.location.replace(this.OktaConfig.strRedirectURL);

            break;

          // For updating the user form the profile screen
          default:
            this.JSONUertoUpdate = JSON.parse(this.CookieService.get('okta_current_user'));
            console.log(this.OktaConfig.strRedirectURL + this.OktaApiEndpoints.strUserMe)
            await this.PostToOktaService.PostUserInfo(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strUserMe, this.OktaGetTokenService.myAccessToken.accessToken, this.JSONUertoUpdate);
            await this.OktaMfaService.RequestSpacer(2);
            this.openSavedSnackBar();
            this.CookieService.delete('okta_current_user')
            window.location.replace(this.OktaConfig.strRedirectURL);
            break;
        }
        break;

    }
    window.location.replace(this.OktaConfig.strRedirectURL);
  }

}

  //async GetStateTokenforWidget(){
  // await this.OktaGetTokenService.GetAccessToken();
  // console.log(this.OktaGetTokenService.strUserName);
  // await this.OktaGetStatetokenService.GetStateToken(this.OktaGetTokenService.strUserName);

  //}

  //async functionMFA(username) {

  //await this.GetStateTokenforWidget();
  //this.strWidgetStateToken = this.CookieService.get('okta_statetoken');
  //await this.OktaWidgetService.login(this.strWidgetStateToken);





  //await this.SaveMFA();
  //this.strMFAStatus = true;

  // console.log('MFA Status received from async function : ' + this.strMFAStatus)


  // switch (this.strMFAStatus) {
  //   case true: {
  //     //Get the user information, and convert into JSON object
  //     const ThisUserArray = localStorage.getItem('okta_new_user_info');
  //     console.log('User to update : ' + ThisUserArray);
  //     this.strThisUser = JSON.parse(ThisUserArray);
  //     console.log(this.strThisUser);
  //     console.log('Get the accessToken from the Token Manager');
  //     const accessToken: AccessToken = await this.authService.tokenManager.get('accessToken') as AccessToken;
  //     this.myAccessToken = accessToken.accessToken;
  //     console.log(this.myAccessToken);

  //     await this.PostToOktaService.PostUserInfo(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strUserMe, this.myAccessToken, this.strThisUser);
  //     localStorage.removeItem('okta_new_user_info');
  //     localStorage.removeItem('okta_swag_total');
  //     localStorage.removeItem('okta_swags');
  //     window.location.replace(this.OktaConfig.strRedirectURL);
  //     this.openSavedSnackBar();
  //     break;
  //   }
  //   case false: {
  //     this.openSnackBar();
  //     this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
  //     document.getElementById("welcomeText").innerHTML = " "
  //     break;

  //   }
  // }
  //}

  // async SaveMFA() {

  //   const OktaClientID = this.OktaConfig.strClientID;
  //   const OktaBaseURI = this.OktaConfig.strBaseURI;
  //   const OktaLang = this.OktaConfig.strLang;

  //   const OktaRedirect = 'https://localhost:4200/ciam-member-site-1/home';
  //   //const OktaRedirect = this.OktaConfig.strRedirectURL;

  //   const OktaBrand = this.OktaConfig.strBrand;
  //   const OktaPostlogoutURI = 'https://localhost:4200/ciam-member-site-1/home';
  //   //const OktaPostlogoutURI = this.OktaConfig.strPostLogoutURL;

  //   const OktaIssuer = this.OktaConfig.strIssuer;
  //   const OktaScope = this.OktaConfig.strScope;
  //   const OktaResType = this.OktaConfig.strResponseType;
  //   const OktaResMode = this.OktaConfig.strResponseMode;
  //   const OktaWidgetLogo = this.OktaConfig.strLogo;
  //   var oktaSignIn = new OktaSignIn({
  //     logo: OktaWidgetLogo,
  //     // clientId: OktaClientID,
  //     clientId: '0oa1y7argbd0Uy9Up1d7',
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
  //   console.log(OktaScope)
  //   var myMFADone = await oktaSignIn.showSignInToGetTokens({
  //     el: '#okta-signin-container'
  //   }).then(function (tokens) {

  //     oktaSignIn.authClient.tokenManager.setTokens(tokens);
  //     oktaSignIn.remove();
  //     const idToken = tokens.idToken;
  //     console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
  //     return true;

  //   }).catch(function (err) {
  //     console.error(err);
  //     return false;
  //   });
  //   console.log('MFA Status : ' + myMFADone)
  //   this.strMFAStatus = myMFADone;
  // }



