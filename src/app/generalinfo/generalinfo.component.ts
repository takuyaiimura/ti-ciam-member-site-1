import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-generalinfo',
  templateUrl: './generalinfo.component.html',
  styleUrls: ['./generalinfo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralinfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
