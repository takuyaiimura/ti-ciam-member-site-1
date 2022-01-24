import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from "app/shared/okta/okta-authentication";
//import { convertTokenParamsToOAuthParams, OktaAuth } from "@okta/okta-auth-js";
import { Subscription } from 'rxjs';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { catchError, map, tap } from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';
import { OktaChecktokenService } from 'app/shared/okta/okta-checktoken.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
// import { ComponentsModule } from './components/components.module';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    private authService = new OktaAuth(this.oktaSDKAuth.config);
    strUserSession;
    private _router: Subscription;
    // private authService = new OktaAuth(this.oktaSDKAuth.config);
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    // constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any,
    //     private element: ElementRef, public location: Location, private oktaSDKAuth: OktaSDKAuthService) { }

    constructor(private renderer: Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any,
        private element: ElementRef, public location: Location,private oktaSDKAuth: OktaSDKAuthService, private OktaChecktokenService: OktaChecktokenService) { }

    async ngOnInit() {

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
          //this.widgetLogin.login();
          break;
  
        case true:
          //window.location.replace(this.oktaSDKAuth.config.redirectUri);
          this.OktaChecktokenService.functionCheckToken();
          break;
  
      }

        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

               

    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
            return false;
        }
        else {
            return true;
        }
    }



}


//
    //console.log(this.strSession);
        // //var strFirstName : string;
        // var authService = new OktaAuth(this.oktaSDKAuth.config);
        // //console.log(this.oktaSDKAuth.config);
        // //console.log(this.oktaSDKAuth.strPostLogoutURL);

        // this.authService.session.get()
        //      .then(result => result)
        //      .then(session => console.log(session) )
        // // logged in
        // console.log(authService.session);



        // authService.token.getWithPopup({
        //     responseType: 'id_token', // or array of types
        //     sessionToken: 'testSessionToken' // optional if the user has an existing Okta session
        // })
        //     .then(function (res) {
        //         var tokens = res.tokens;
        //         this.strUserRes = res.tokens;

        //         //console.log(tokens.idToken);
        //         console.log(tokens.idToken.claims.email);
        //         // Do something with tokens, such as
        //         authService.tokenManager.setTokens(tokens);
        //         //console.log(tokens.accessToken.value);


        //         // return authService.token.getUserInfo(tokens.accessToken, tokens.idToken )
        //         //     .then(function (user) {
        //         //         //console.log(user);                              
        //         //         //strFirstName = JSON.stringify(user.given_name);
        //         //         //console.log(strFirstName);


        //         //         console.log('Howdy ' + user.given_name + " " + user.family_name);
        //         //         document.getElementById('logged_in_user').innerHTML = "ようこそ" + user.given_name + " " + user.family_name + "さん";
        //         //         document.getElementById('UserFirstName').innerHTML = user.given_name;
        //         //         //document.getElementById('fullname').innerHTML = user.given_name + " " + user.family_name;

        //         //         //return Promise.resolve(authService.results);

        //         //     })

        //     })

        //     .catch(function (err) {
        //         // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
        //     });
        //}
        //)
        // .catch(function (err) {
        //     // not logged in

        // }

        //);
