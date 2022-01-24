import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// Material UI stuff
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { SdkLoginComponent } from './sdk-login/sdk-login.component';
import { WidgetModalComponent } from './widget-modal/widget-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { Router, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProfileDisplaypageComponent } from './profile-displaypage/profile-displaypage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {A11yModule} from '@angular/cdk/a11y';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotLoggedInNotificationComponent } from './not-logged-in-notification/not-logged-in-notification.component';
import { HomeComponent } from './home/home.component'; 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Profilev2Component } from './profilev2/profilev2.component';
import { TokenexpireComponent } from './tokenexpire/tokenexpire.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GeneralinfoComponent } from './generalinfo/generalinfo.component';
import {MatListModule} from '@angular/material/list';
import { SelectucComponent } from './selectuc/selectuc.component';
import { ProfilesavedComponent } from './profilesaved/profilesaved.component';
import { OktacontentsComponent } from './oktacontents/oktacontents.component';
import { OtheroktaresourceComponent } from './otheroktaresource/otheroktaresource.component';
import { CartPageComponent } from './shoppingcart/cart-page/cart-page.component';
import { SwagstoreComponent } from './swagstore/swagstore.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmorderComponent } from './confirmorder/confirmorder.component';
import {PostToOktaService} from 'app/shared/okta/post-to-okta.service';
import { EmptycartComponent } from './emptycart/emptycart.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OktaMfaService } from 'app/shared/okta/okta-mfa.service'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SdkLoginComponent,
    WidgetModalComponent,
    RegisterModalComponent,
    ProfileDisplaypageComponent,
    NotLoggedInNotificationComponent,
    HomeComponent,
    Profilev2Component,
    TokenexpireComponent,
    GeneralinfoComponent,
    SelectucComponent,
    ProfilesavedComponent,
    OktacontentsComponent,
    OtheroktaresourceComponent,
    CartPageComponent,
    SwagstoreComponent,
    CheckoutComponent,
    ConfirmorderComponent,
    EmptycartComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule, 
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    A11yModule,
    FlexLayoutModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    
    
    
  ],
  providers: [
    OktaSDKAuthService, 
    ProfilesavedComponent, 
    Profilev2Component,
    ConfirmorderComponent, 
    PostToOktaService,
    EmptycartComponent,
    OktaMfaService,
    
  ], 

  
  bootstrap: [AppComponent]
})
export class AppModule { }
