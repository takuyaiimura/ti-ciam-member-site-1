import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emptycart',
  templateUrl: './emptycart.component.html',
  styleUrls: ['./emptycart.component.css']
})
export class EmptycartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('okta_swags');
    localStorage.removeItem('okta_swag_total');
  }

}
