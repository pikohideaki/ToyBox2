import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'ToyBox';

  testdata: any[] = [];

  constructor(
    private location: Location
  ) {
    for ( let i = 0; i < 1150; ++i ) {
      this.testdata.push( { title: i } );
    }
  }

}
