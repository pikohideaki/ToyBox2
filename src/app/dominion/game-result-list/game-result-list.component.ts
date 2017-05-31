import { Component, OnInit, Pipe } from '@angular/core';

import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../my-library.service';
import { MyDataTableComponent } from '../../my-data-table/my-data-table.component';

import { GameResult } from "../game-result";
import { GetGameResultService } from '../get-game-result.service';



import { ItemsPerPageComponent, initializeItemsPerPageOption } from '../../my-data-table/items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from '../../my-data-table/pagenation/pagenation.component';


@Component({
  providers: [GetGameResultService],
  selector: 'app-game-result-list',
  templateUrl: './game-result-list.component.html',
  styleUrls: [
    '../../my-data-table/my-data-table.component.css',
    './game-result-list.component.css'
  ]
})
export class GameResultListComponent implements OnInit {

  GameResultList: GameResult[] = [];
  GameResultListForView: any[] = [];
  httpGetDone: boolean = false;

  // pagenation
  selectedPageIndex: number = 0;
  itemsPerPageOptions: number[] = [ 50, 100, 200 ];
  itemsPerPageDefault: number = 100;
  itemsPerPage: number;
  getDataForView() {
    return getPagenatedData(
        this.GameResultList.reverse(),
        this.itemsPerPage,
        this.selectedPageIndex );
  }
  setSelectedPageIndex( idx: number ): void { this.selectedPageIndex = idx; }
  setItemsPerPage( size: number ): void { this.itemsPerPage = size; }


  constructor(
    private httpService: GetGameResultService,
    public dialog: MdDialog,
  ) {}

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
    this.httpService.GetGameResult()
    .then( data => {
      this.GameResultList = data;
      this.GameResultListForView = this.GameResultList.map( x => this.transform(x) );
      this.httpGetDone = true;
    });
  }

  getDetail(): void {
    console.log("getDetail");
  }
  editGameResult(): void {
    console.log("editGameResult");
  }



  showDetail( cardNo: number ) {
    const selectedData = this.transform( this.GameResultList.find( x => x.no == cardNo ) );
    console.log( selectedData );
    // let dialogRef = this.dialog.open( CardPropertyDialogComponent, {
    //   height: '80%',
    //   width : '80%',
    // });
    // dialogRef.componentInstance.card = selectedCard;
    // dialogRef.afterClosed().subscribe( result => {} );
  }


  transform( cardProperty: GameResult ): any {
    return cardProperty;
  }


}



// @Pipe({
//   name: 'reverse'
// })
// export class ReversePipe {
//   transform(value) {
//     return value.slice().reverse();
//   }
// }
