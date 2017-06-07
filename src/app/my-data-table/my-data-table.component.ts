import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MyLibraryService } from '../my-library.service';

// import { ResetButtonComponent } from './reset-button/reset-button.component';
import { ItemsPerPageComponent, initializeItemsPerPageOption } from './items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from './pagenation/pagenation.component';
import { TableBodyComponent } from './table-body/table-body.component';


@Component({
  selector: 'my-data-table',
  templateUrl: './my-data-table.component.html',
  styleUrls: ['./my-data-table.component.css']
})
export class MyDataTableComponent implements OnInit, OnChanges  {

  @Input() data: any[] = [];
  filteredData: any[] = [];

  @Input()
  columnSettings: {
      name        : string,
      align       : string,
      manip       : string,
      manipState  : any,
      button      : boolean,
      headerTitle : string,
    }[] = [];


  // pagenation
  @Input() itemsPerPageOptions: number[] = [ 25, 50, 100, 200 ];
  @Input() itemsPerPageDefault: number = 100;
  itemsPerPage: number = 100;
  selectedPageIndex: number = 0;


  constructor(
    private mylib: MyLibraryService
  ) {}

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
    console.log(this.columnSettings)
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes.data != undefined ) {  // at http-get done

    }
  }

  /* フィルタ済みの表示直前データから指定ページ範囲分のみ取り出す */
  getDataAtPage( selectedPageIndex: number ): any[] {
    return getPagenatedData(
          this.filteredData,
          this.itemsPerPage,
          selectedPageIndex );
  }
}
