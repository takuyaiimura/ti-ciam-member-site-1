import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  

declare const OktaWidget: any;

declare const CallReg: any;
declare const REGWidremove: any;

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
  
})
export class RegisterModalComponent implements OnInit {

  constructor(public _dialogRef: MatDialogRef<RegisterModalComponent>) { }

  ngOnInit()
  {
    CallReg();
    // OktaWidget();
    // GoToReg();
  }

// Close the dialog
 closeModal() {
  this._dialogRef.close();
  //Remove the widget
//  REGWidremove();
}  

}
