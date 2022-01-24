import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//// This is needed to import from a path
import { WidgetModalComponent } from 'app/widget-modal/widget-modal.component';
import { RegisterModalComponent } from 'app/register-modal/register-modal.component';
import { SdkLoginComponent } from 'app/sdk-login/sdk-login.component';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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


declare const OktaMFA: any;
declare const RemoveMFAWidget: any;



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public Userfullname: any;
    private authService = new OktaAuth(this.oktaSDKAuth.config);


    constructor(private oktaSDKAuth: OktaSDKAuthService, public location: Location, private element: ElementRef, public _matdialog: MatDialog, private OktaAuthClient: OktaSDKAuthService, private router: Router,private cookieService: CookieService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];


    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/home') {
            return true;
        }
        else {
            return false;
        }
    }

    // //////////////////
    // Login
    // //////////////////
    // openModal() {
    //     const dialogConfig = new MatDialogConfig();

    //     this.sidebarClose();

    //     // 表示するdialogの設定
    //     //dialogConfig.disableClose = true;
    //     dialogConfig.id = "login-component";
    //     dialogConfig.height = "700px";
    //     dialogConfig.width = "450px";


    //     const modalDialog = this._matdialog.open(LoginComponent, dialogConfig);
    //   }

    // //////////////////
    // Widget Login
    // //////////////////
    widgetModal() {
        const WidgetDialogConfig = new MatDialogConfig();
        this.sidebarClose();


        // 表示するdialogの設定
        WidgetDialogConfig.disableClose = false;
        WidgetDialogConfig.id = "widget-modal-component";
        // WidgetDialogConfig.height = "600px";
        // WidgetDialogConfig.width = "450px";


        const modalDialog = this._matdialog.open(WidgetModalComponent, WidgetDialogConfig);
    }

    // //////////////////
    // Registeration
    // //////////////////
    registerModal() {
        const RegisterDialogConfig = new MatDialogConfig();
        this.sidebarClose();

        // 表示するdialogの設定
        //RegisterDialogConfig.disableClose = true;
        RegisterDialogConfig.id = "register-modal-component";
        RegisterDialogConfig.height = "700px";
        RegisterDialogConfig.width = "450px";



        const modalDialog = this._matdialog.open(RegisterModalComponent, RegisterDialogConfig);
    }

    // //////////////////
    // Login SDK
    // //////////////////
    LoginModal() {
        const LoginDialogConfig = new MatDialogConfig();
        this.sidebarClose();

        // 表示するdialogの設定
        //dialogConfig.disableClose = true;
        LoginDialogConfig.id = "sdk-login-component";
        // LoginDialogConfig.height = "440px";
        //LoginDialogConfig.width = "470px";

        const modalDialog = this._matdialog.open(SdkLoginComponent, LoginDialogConfig);
    }

    // //////////////////
    // Angular Widget
    // //////////////////
    // AngularWidgetModal() {
    //     const AngularWidgetDialogConfig = new MatDialogConfig();
    //     this.sidebarClose();

    //     // 表示するdialogの設定
    //     AngularWidgetDialogConfig.disableClose = true;
    //     AngularWidgetDialogConfig.id = "angular-modal-component";
    //     AngularWidgetDialogConfig.height = "680px";
    //     AngularWidgetDialogConfig.width = "450px";

    //     const modalDialog = this._matdialog.open(AngularWidgetComponent, AngularWidgetDialogConfig);
    //   }

    ProfilePage() {
        // this.router.navigate(['https://kent-nagao-test.oktapreview.com/home/kent-nagao-test_angulartest_3/0oa1bn5842y4SaRrA1d7/aln1bn8srsqNf0zLq1d7']);
        OktaMFA();


    }

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    OktaLogout() {
        this.OktaAuthClient.OktaSDKAuthClient.signOut();
        localStorage.clear;
        this.cookieService.deleteAll();
        localStorage.removeItem('okta_swags');
        localStorage.removeItem('okta_swag_total');
        localStorage.removeItem('okta_new_user_info');
        document.getElementById("welcomeText").innerHTML = " "
        
    }



    // async test() {

    //     this.authService.token.getWithoutPrompt()
    //         .then(function (user) {
    //             // user has details about the user
    //             //console.log(user)

    //             return user;
    //             //return Promise.resolve(this.authService);
    //         })
    //         .catch(function (err) {
    //         });
    //     let url = 'https://kent-nagao-test.oktapreview.com/api/v1/users/me';

    //     let strSession = await this.authService.token.getWithoutPrompt()
    //     var token = strSession.tokens.accessToken.accessToken;
    //     //console.log(token);
    //     // let myToken = token;

        
    //     fetch(url, {
    //         method: 'GET', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token,
    //             'Accept': 'application/json',
    //         },
            
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data));

    //     /////////////////////////////////////
    //     /////////////////////////////////////
    //     // async function fetchRequest(url) {

    //     //     // Fetch request and parse as JSON
    //     //     const response = await fetch(url, {

    //     //          headers: new Headers({
    //     //             'Authorization': 'Bearer ' + token,
    //     //             'Accept': 'application/json',
    //     //             'Content-Type': 'application/json',


    //     //         })
    //     //     });

    //     // }
    //     // await fetchRequest(url);
    //     // // await fetchRequest(url).then(data => {
    //     // //     console.log(data);
    //     // // })
    // }

}



