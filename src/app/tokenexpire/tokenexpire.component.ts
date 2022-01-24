import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tokenexpire',
  templateUrl: './tokenexpire.component.html',
  styleUrls: ['./tokenexpire.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TokenexpireComponent implements OnInit {

  constructor(private OktaSDKAuthService: OktaSDKAuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  TimeOut() {

    this.OktaSDKAuthService.OktaSDKAuthClient.signOut();
    this.cookieService.deleteAll();
    localStorage.clear();
  }

}
