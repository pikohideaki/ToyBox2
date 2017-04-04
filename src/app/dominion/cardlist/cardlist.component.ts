import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  constructor(
    // private location: Location
  ) { }

  ngOnInit() {
  }

  // goBack(): void {
  //   this.location.back();
  // }
}
