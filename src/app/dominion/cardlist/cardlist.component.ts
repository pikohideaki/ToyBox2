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
    { name: 'no'         , align: 'c', manip: 'none'             , button: false, headerTitle: 'No.' },
    { name: 'name_jp'    , align: 'c', manip: 'incrementalSearch', button: true , headerTitle: '名前' },
    { name: 'name_eng'   , align: 'c', manip: 'incrementalSearch', button: false, headerTitle: 'Name' },
    { name: 'set_name'   , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: 'セット名' },
    { name: 'category'   , align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: '分類' },
    { name: 'card_type'  , align: 'c', manip: 'autoComplete'     , button: false, headerTitle: '種別' },
    { name: 'cost_str'   , align: 'c', manip: 'none'             , button: false, headerTitle: 'コスト' },
    { name: 'VP'         , align: 'c', manip: 'none'             , button: false, headerTitle: 'VP' },
    { name: 'draw_card'  , align: 'c', manip: 'none'             , button: false, headerTitle: '+card' },
    { name: 'action'     , align: 'c', manip: 'none'             , button: false, headerTitle: '+action' },
    { name: 'buy'        , align: 'c', manip: 'none'             , button: false, headerTitle: '+buy' },
    { name: 'coin'       , align: 'c', manip: 'none'             , button: false, headerTitle: '+coin' },
    { name: 'VPtoken'    , align: 'c', manip: 'none'             , button: false, headerTitle: '+VPtoken' },
    { name: 'implemented', align: 'c', manip: 'filterBySelecter' , button: false, headerTitle: 'ゲーム実装状況' },
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
      this.CardPropertyListForView = this.CardPropertyList.map( x => this.transform(x) );
      this.httpGetDone = true;
    });
  }


  showDetail( cardNo: number ) {
    const selectedCardForView = this.transform( this.CardPropertyList.find( x => x.no == cardNo ) );

    let dialogRef = this.dialog.open( CardPropertyDialogComponent, {
            height: '80%',
            width : '80%',
        });
    dialogRef.componentInstance.card = selectedCardForView;
    // dialogRef.afterClosed().subscribe( result => {} );
  }



  transform( cardProperty: CardProperty ): any {
    let cost = cardProperty.cost;
    let costStr = '';
    if ( cost.coin > 0 || ( cost.potion == 0 && cost.debt == 0 ) ) {
      costStr += cost.coin.toString();
    }
    if ( cost.potion > 0 ) {
      for ( let i = 0; i < cost.potion; ++i ) costStr += 'P';
    }
    if ( cost.debt   > 0 ) {
      costStr += `<${cost.debt.toString()}>`;
    }

    return {
      no                      : cardProperty.no                      ,
      card_ID                 : cardProperty.card_ID                 ,
      name_jp                 : cardProperty.name_jp                 ,
      name_jp_yomi            : cardProperty.name_jp_yomi            ,
      name_eng                : cardProperty.name_eng                ,
      set_name                : cardProperty.set_name                ,
      cost_coin               : cardProperty.cost.coin               ,
      cost_potion             : cardProperty.cost.potion             ,
      cost_debt               : cardProperty.cost.debt               ,
      cost_str                : costStr                              ,
      category                : cardProperty.category                ,
      card_type               : cardProperty.card_type               ,
      VP                      : cardProperty.VP                      ,
      draw_card               : cardProperty.draw_card               ,
      action                  : cardProperty.action                  ,
      buy                     : cardProperty.buy                     ,
      coin                    : cardProperty.coin                    ,
      VPtoken                 : cardProperty.VPtoken                 ,
      effect                  : cardProperty.effect                  ,
      description             : cardProperty.description             ,
      recommended_combination : cardProperty.recommended_combination ,
      memo                    : cardProperty.memo                    ,
      implemented             : ( cardProperty.implemented ?  '実装済み' : '未実装' ),
    };
  }


}

