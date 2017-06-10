import { Component, OnInit, Input  } from '@angular/core';

import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../my-library.service';
import { MyDataTableComponent } from '../../my-data-table/my-data-table.component';

// import { CardCost } from '../card-cost';
import { CardProperty } from "../card-property";
import { CardPropertyHttpService } from '../http-card-property.service';
// import { CardListPipe } from './card-list.pipe';
import { CardPropertyDialogComponent } from '../card-property-dialog/card-property-dialog.component';



@Component({
  providers: [MyLibraryService, CardPropertyHttpService],
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: [
    '../../my-data-table/my-data-table.component.css',
    './cardlist.component.css'
  ],
})
export class CardlistComponent implements OnInit {

  CardPropertyList: CardProperty[] = [];
  CardPropertyListForView: any[] = [];
  httpGetDone: boolean = false;

  // pagenation settings
  itemsPerPageOptions: number[] = [ 25, 50, 100, 200 ];
  itemsPerPageDefault: number = 50;


  columnSettings = [
    { name: 'no'                  , align: 'c', manip: 'none'             , button: false, headerTitle: 'No.' },
    { name: 'name_jp'             , align: 'c', manip: 'incrementalSearch', button: true , headerTitle: '名前' },
    { name: 'name_eng'            , align: 'c', manip: 'incrementalSearch', button: false, headerTitle: 'Name' },
    { name: 'set_name'            , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: 'セット名' },
    { name: 'category'            , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: '分類' },
    { name: 'card_type'           , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: '種別' },
    { name: 'costStr'             , align: 'c', manip: 'none'             , button: false, headerTitle: 'コスト' },
    { name: 'VP'                  , align: 'c', manip: 'none'             , button: false, headerTitle: 'VP' },
    { name: 'draw_card'           , align: 'c', manip: 'none'             , button: false, headerTitle: '+card' },
    { name: 'action'              , align: 'c', manip: 'none'             , button: false, headerTitle: '+action' },
    { name: 'buy'                 , align: 'c', manip: 'none'             , button: false, headerTitle: '+buy' },
    { name: 'coin'                , align: 'c', manip: 'none'             , button: false, headerTitle: '+coin' },
    { name: 'VPtoken'             , align: 'c', manip: 'none'             , button: false, headerTitle: '+VPtoken' },
    { name: 'implemented'         , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: 'ゲーム実装状況' },
    { name: 'randomizer_candidate', align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: 'ランダマイザー対象' },
  ];




  constructor(
    private mylib: MyLibraryService,
    private httpCardPropertyHttpService: CardPropertyHttpService,
    public dialog: MdDialog,
  ) {}

  ngOnInit() {
    this.httpCardPropertyHttpService.GetCardPropertyList()
    .then( data => {
      this.CardPropertyList = data as CardProperty[];
    //   this.CardPropertyListForView = this.CardPropertyList.map( x => this.transform(x) );
      this.CardPropertyListForView = this.CardPropertyList.map( x => x.transform() );
      this.httpGetDone = true;
    });
  }


  showDetail( cardNo: number ) {
    // const selectedCardForView = this.transform( this.CardPropertyList.find( x => x.no == cardNo ) );
    const selectedCardForView = this.CardPropertyList.find( x => x.no == cardNo ).transform();

    let dialogRef = this.dialog.open( CardPropertyDialogComponent, {
            height: '80%',
            width : '80%',
        });
    dialogRef.componentInstance.card = selectedCardForView;
    // dialogRef.afterClosed().subscribe( result => {} );
  }
}

