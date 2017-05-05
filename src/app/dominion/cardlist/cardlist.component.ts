// import { Component, OnInit, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';

import { CardProperty } from "../card-property";
import { GetCardPropertyService } from '../get-card-property.service';
import { CardListPipe } from './card-list.pipe';

import { ResetButtonComponent } from '../../noshiro-data-table/reset-button/reset-button.component';

import { TableHeaderComponent } from '../../noshiro-data-table/table-header/table-header.component';
import { ItemsPerPageComponent, initializeItemsPerPageOption } from '../../noshiro-data-table/items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from '../../noshiro-data-table/pagenation/pagenation.component';


@Component({
  providers: [GetCardPropertyService, ResetButtonComponent],
  // providers: [MyLibraryService, GetCardPropertyService],
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: [
    '../../noshiro-data-table/noshiro-data-table.component.css',
    './cardlist.component.css'
  ]
})
export class CardlistComponent implements OnInit {

  constructor(
    private mylib: MyLibraryService,
    private httpService: GetCardPropertyService,
    private resetButton: ResetButtonComponent
  ) {
  }

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
    this.httpService.GetCardProperty()
     .then( data => {
       this.CardPropertyList = data;
       this.CardPropertyListFiltered = this.CardPropertyList.filter( x => this.filterFunction(x) );
       this.selectorOptions = this.generateSelectorOptions( this.CardPropertyListFiltered );
     });
    //  .then( () => console.log( this.selectorOptions, this.CardPropertyList ) );
  }



  CardPropertyList: CardProperty[] = [];
  CardPropertyListFiltered: CardProperty[] = [];

  // pagenation
  selectedPageIndex: number = 0;
  itemsPerPageOptions: number[] = [ 25, 50, 100, 200 ];
  itemsPerPageDefault: number = 50;
  itemsPerPage: number;
  setSelectedPageIndex( idx: number ): void { this.selectedPageIndex = idx; }
  setItemsPerPage( size: number ): void { this.itemsPerPage = size; }
  selectorOptions: any = {};

  columnSettings
    : {
        columnName: string,
        align: string,
        manip: string,
        manipState: any,
        headerTitle: string,
      }[]
   = [
    { columnName: 'no'         , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: 'No.' },
    { columnName: 'name_jp'    , align: 'l', manip: 'incrementalSearch', manipState: undefined,  headerTitle: '名前' },
    { columnName: 'name_eng'   , align: 'l', manip: 'incrementalSearch', manipState: undefined,  headerTitle: 'Name' },
    { columnName: 'set_name'   , align: 'c', manip: 'filterBySelecter' , manipState: undefined,  headerTitle: 'セット名' },
    { columnName: 'category'   , align: 'c', manip: 'filterBySelecter' , manipState: undefined,  headerTitle: '分類' },
    { columnName: 'card_type'  , align: 'c', manip: 'incrementalSearch', manipState: undefined,  headerTitle: '種別' },
    { columnName: 'cost_str'   , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: 'コスト' },
    { columnName: 'VP'         , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: 'VP' },
    { columnName: 'draw_card'  , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: '+card' },
    { columnName: 'action'     , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: '+action' },
    { columnName: 'buy'        , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: '+buy' },
    { columnName: 'coin'       , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: '+coin' },
    { columnName: 'VPtoken'    , align: 'c', manip: 'sort'             , manipState: undefined,  headerTitle: '+VPtoken' },
    { columnName: 'implemented', align: 'c', manip: 'filterBySelecter' , manipState: undefined,  headerTitle: 'ゲーム実装状況' },
  ];




  /*
  select押すときにはその時点でのselect optionは作成してある状態に
  選択肢が変わったらfilter後のデータを作成しoptionもすべて更新
  advanced : 差分で計算
  */

  updateView() {
    // console.log( this.columnSettings.map( e => e.inputValue ) );
    this.CardPropertyListFiltered = this.CardPropertyList.filter( x => this.filterFunction(x) );
    this.selectorOptions = this.generateSelectorOptions( this.CardPropertyListFiltered );
    // this.CardPropertyListFiltered = this.CardPropertyList.filter( x => this.sortFunction(x) );
  }

  reset( columnName?: string ): void {
    this.resetButton.resetSelector( this.columnSettings, columnName );
    this.updateView();
  }

  // sortColumn( order, columnName ): void {
  //   let newOrder;
  //   if ( order == undefined    ) newOrder = 'accending';
  //   if ( order == 'accending'  ) newOrder = 'descending';
  //   if ( order == 'descending' ) newOrder = undefined;
  //   this.columnSettings.find( e => e.propertyName == columnName ).manipState = newOrder;
  // }

  filterFunction( data: CardProperty ): boolean {
    let validSettings = this.columnSettings.filter( column => column.manipState != undefined );

    for ( let column of validSettings ) {
      switch ( column.manip ) {
        case 'filterBySelecter' :
          if ( data[ column.columnName ] != column.manipState ) return false;

        case 'incrementalSearch' :
          let regexp = new RegExp( column.manipState, "gi" );
          if ( !regexp.test( data[ column.columnName ] ) ) return false;

        default :
          break;
      }
    }
    return true;
  }

  // sortFunction( data: CardProperty ) {

  // }


  /* データから指定列を取り出す */
  getColumn( data: CardProperty[], columnName: string ): any[] {
    return data.map( e => e[ columnName ] );
  }

  generateSelectorOptions( data: CardProperty[] ): any {
    let selectorOptions = {};
    for ( let e of this.columnSettings ) {
      if ( e.manip != 'filterBySelecter' ) continue;
      selectorOptions[ e.columnName ]
       = this.mylib.uniq( this.getColumn( data, e.columnName ) );
    }
    return selectorOptions;
  }



  /* フィルタ済みの表示直前データから指定ページ範囲分のみ取り出す */
  getDataAtPage( selectedPageIndex: number ): CardProperty[] {
    return getPagenatedData(
          this.CardPropertyListFiltered,
          this.itemsPerPage,
          selectedPageIndex );
  }

}
