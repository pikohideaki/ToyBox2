import { Component, OnInit, Input, Directive } from '@angular/core';

import { ItemsPerPageComponent, initializeItemsPerPageOption } from './items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from './pagenation/pagenation.component';


@Component({
  selector: 'noshiro-data-table',
  templateUrl: './noshiro-data-table.component.html',
  styleUrls: ['./noshiro-data-table.component.css']
})
export class NoshiroDataTableComponent implements OnInit {

  @Input() data: any[] = [];


  // pagenation
  selectedPageIndex: number = 0;
  itemsPerPageOptions: number[] = [ 25, 50, 100, 200 ];
  itemsPerPageDefault: number = 100;
  itemsPerPage: number = 100;
  getDataForView() {
    return getPagenatedData(
        this.data,
        this.itemsPerPage,
        this.selectedPageIndex );
  }
  setSelectedPageIndex( idx: number ): void { this.selectedPageIndex = idx; }
  setItemsPerPage( size: number ): void { this.itemsPerPage = size; }


  constructor() { }

  ngOnInit() {
    this.itemsPerPageOptions = initializeItemsPerPageOption( this.data.length, 25, 'x', 2 );
    this.itemsPerPage = this.itemsPerPageDefault;
  }


}
