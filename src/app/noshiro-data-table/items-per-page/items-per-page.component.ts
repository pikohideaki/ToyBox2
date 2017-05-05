import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'noshiro-data-table--items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrls: ['./items-per-page.component.css']
})
export class ItemsPerPageComponent implements OnInit {

  @Input() itemsPerPageOptions: number[] = [];  //[ 25, 50, 100, 200 ];
  @Input() itemsPerPageDefault: number = 0;  //50;
  itemsPerPage: number = 0;

  @Output() submitItemsPerPage = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
  }

  setItemsPerPage( size: number ): void {
    this.itemsPerPage = size;
    this.submitItemsPerPage.emit( this.itemsPerPage );
  }


}


export function initializeItemsPerPageOption(
    dataSize: number, base: number, stepBy: string, step = 2, max: number = 10000 )
    : number[]
{
  let option: number = base;
  let options: number[] = [];

  switch (stepBy) {
    case 'x' :
    case 'multiply' :
      while ( option < dataSize && option < max ) {
        options.push( option );
        option *= step;
      }
      break;
    case '+' :
    case 'add' :
      while ( option < dataSize && option < max ) {
        options.push( option );
        option += step;
      }
      break;
    default :
      break;
  }
  options.push( option );

  return options;
}