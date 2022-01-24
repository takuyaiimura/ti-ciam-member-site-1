import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDisplaypageComponent } from './profile-displaypage/profile-displaypage.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { Profilev2Component } from 'app/profilev2/profilev2.component';
import { SwagstoreComponent } from './swagstore/swagstore.component';
import { CheckoutComponent } from 'app/checkout/checkout.component';
// import { SaveModalComponent } from 'app/save-modal/save-modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'profile',           component: ProfileDisplaypageComponent},
  { path: 'profilev2', component: Profilev2Component },
  { path: 'store', component: SwagstoreComponent },
  { path: 'checkout', component: CheckoutComponent },
  // { path: 'save', component: SaveModalComponent },
  //{ path: 'signup',           component: SignupComponent },
  //{ path: 'landing',          component: LandingComponent },
  // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
