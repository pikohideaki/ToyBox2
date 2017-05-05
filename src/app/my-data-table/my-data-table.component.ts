import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MyLibraryService } from '../my-library.service';

import { ResetButtonComponent } from './reset-button/reset-button.component';
import { ItemsPerPageComponent, initializeItemsPerPageOption } from './items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from './pagenation/pagenation.component';


@Component({
  providers: [ResetButtonComponent],
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
  selectorOptions: any = {};

  @Output() onClick = new EventEmitter<number>();


  constructor(
    private mylib: MyLibraryService,
    private resetButton: ResetButtonComponent
  ) {}

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
  }

  ngOnChanges( changes: SimpleChanges ) {
    console.log( changes );
    if ( changes.data != undefined ) {  // at http-get done
      this.updateView();
    }
  }



  updateView() {
    this.filteredData = this.data.filter( x => this.filterFunction(x) );
    this.selectorOptions = this.generateSelectorOptions( this.filteredData );
    this.selectedPageIndex = 0;
  }

  reset( name?: string ): void {
    this.resetButton.resetSelector( this.columnSettings, name );
    this.updateView();
  }


  filterFunction( data: any ): boolean {
    let validSettings = this.columnSettings.filter( column => column.manipState != undefined );

    for ( let column of validSettings ) {
      switch ( column.manip ) {
        case 'filterBySelecter' :
          if ( data[ column.name ] != column.manipState ) return false;

        case 'incrementalSearch' :
          let regexp = new RegExp( column.manipState, "gi" );
          if ( !regexp.test( data[ column.name ] ) ) return false;

        default :
          break;
      }
    }
    return true;
  }


  /* データから指定列を取り出す */
  getColumn( data: any[], name: string ): any[] {
    return data.map( e => e[ name ] );
  }

  generateSelectorOptions( data: any[] ): any {
    let selectorOptions = {};
    for ( let e of this.columnSettings ) {
      if ( e.manip != 'filterBySelecter' ) continue;
      selectorOptions[ e.name ]
       = this.mylib.uniq( this.getColumn( data, e.name ) );
    }
    return selectorOptions;
  }



  /* フィルタ済みの表示直前データから指定ページ範囲分のみ取り出す */
  getDataAtPage( selectedPageIndex: number ): any[] {
    return getPagenatedData(
          this.filteredData,
          this.itemsPerPage,
          selectedPageIndex );
  }


  clicked( cardNo: number ) {
    this.onClick.emit( cardNo );
  }
}
