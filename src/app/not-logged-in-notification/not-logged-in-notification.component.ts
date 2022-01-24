import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-not-logged-in-notification',
  templateUrl: './not-logged-in-notification.component.html',
  styleUrls: ['./not-logged-in-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotLoggedInNotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
