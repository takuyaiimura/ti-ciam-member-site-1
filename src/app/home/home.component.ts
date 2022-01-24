import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from 'app/shared/navbar/navbar.component';
import { AuthService } from "app/shared/okta/okta-authentication";
//import { convertTokenParamsToOAuthParams, OktaAuth } from "@okta/okta-auth-js";
import { Subscription } from 'rxjs';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { catchError, map, tap } from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';

import {
    OktaAuth,
    OktaAuthOptions,
    TokenManager,
    AccessToken,
    IDToken,
    UserClaims,
    TokenParams
} from '@okta/okta-auth-js'
// import { ComponentsModule } from 'app/components/components.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  UserLoggedIn: any;
  public strWelcome;
  private _router: Subscription;
    private authService = new OktaAuth(this.oktaSDKAuth.config);
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(public renderer: Renderer2, public router: Router, @Inject(DOCUMENT,) public document: any,
    public element: ElementRef, public location: Location, public oktaSDKAuth: OktaSDKAuthService) { }

    async ngOnInit() {
        
        
        var strSession = this.authService.token.getWithoutPrompt({
            responseType: 'id_token', // or array of types
            sessionToken: 'testSessionToken', // optional if the user has an existing Okta session           
        })
            .then(function (res) {
                var tokens = res.tokens;
                //console.log(res.tokens);
                //console.log(res.state);
                var strUser = tokens.idToken.claims.email;
                console.log(strUser);
                return tokens.idToken.claims.email;
            }
            )
        
            const strUserGet = async () => {
            const strUseremail = await strSession;
            //console.log(strUseremail)
            this.UserLoggedIn = strUseremail;            
            this.strWelcome = "ようこそ"
            
        }
        if(location.pathname=="/profile") {
            //If not in the profile page, don't get the current user
        }
        else{
            strUserGet();
        }
    }

}





        