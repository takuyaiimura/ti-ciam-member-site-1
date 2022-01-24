import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/shared/okta/okta-authentication";
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";



@Component({
  selector: 'app-sdk-login',
  templateUrl: './sdk-login.component.html',
  styleUrls: ['./sdk-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SdkLoginComponent implements OnInit {
  loginform: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  //private returnUrl: string;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private OktaConfig: OktaConfig) { }

  async ngOnInit() {

    //this.authService.oktaSignIn.remove();
    this.loginform = this.fb.group({
      username: ["", Validators.email],
      password: ["", Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await console.log("logged in, redirecting you to the home page");
      window.location.replace(this.OktaConfig.strRedirectURL);

    }
  }

  async onSubmit() {
    
    console.log("event fired");
    console.log("loginInvalid", this.loginInvalid);
    console.log("formSubmitAttempt", this.formSubmitAttempt);
    console.log("returnUrl", this.OktaConfig.strRedirectURL);

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    //if (this.loginform.valid) {
    //try {
    var username = this.loginform.get("username").value;
    var password = this.loginform.get("password").value;
    //document.getElementById("okta_japan").remove();
    await this.authService.login(username, password);


    //} catch (err) {
    //alert(this.authService.strstateToken)      
    this.loginInvalid = true;
    //}
    //} else 
    {
      this.formSubmitAttempt = true;
      //console.log("username", username);
      //console.log("password", password);
    }
  }



  logout() {
    this.authService.OktaLogout();
  }
}


