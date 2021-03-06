import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../../my-library.service';
import { MyDataTableComponent } from '../../../my-data-table/my-data-table.component';

import { GameResult } from "../../game-result";



import { ItemsPerPageComponent, initializeItemsPerPageOption } from '../../../my-data-table/items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from '../../../my-data-table/pagenation/pagenation.component';


@Component({
  selector: 'game-result-list',
  templateUrl: './game-result-list.component.html',
  styleUrls: [
    '../../../my-data-table/my-data-table.component.css',
    './game-result-list.component.css'
  ]
})
export class GameResultListComponent implements OnInit, OnChanges {

    @Input() GameResultListFiltered: GameResult[] = [];
    GameResultListForView: any[] = [];

    // pagenation
    selectedPageIndex: number = 0;
    itemsPerPageOptions: number[] = [ 50, 100, 200, 400 ];
    itemsPerPageDefault: number = 200;
    itemsPerPage: number;
    getDataForView() {
        return getPagenatedData(
            this.GameResultListFiltered.reverse(),
            this.itemsPerPage,
            this.selectedPageIndex );
    }
    setSelectedPageIndex( idx: number ): void { this.selectedPageIndex = idx; }
    setItemsPerPage( size: number ): void { this.itemsPerPage = size; }


    constructor(
        public dialog: MdDialog,
    ) {}

    ngOnInit() {
        this.itemsPerPage = this.itemsPerPageDefault;
    }


    ngOnChanges( changes: SimpleChanges ) {
        if ( changes.GameResultListFiltered != undefined ) {  // at http-get done
            // this.GameResultListForView = this.GameResultListFiltered.map( x => this.transform(x) );
            this.selectedPageIndex = 0;
        }
    }


    getDetail(): void {
        console.log("getDetail");
    }
    editGameResult(): void {
        console.log("editGameResult");
    }



    // showDetail( cardNo: number ) {
    //     const selectedData = this.transform( this.GameResultListFiltered.find( x => x.no == cardNo ) );
    //     console.log( selectedData );
    // }


    // transform( cardProperty: GameResult ): any {
    //     return cardProperty;
    // }
}



// @Pipe({
//   name: 'reverse'
// })
// export class ReversePipe {
//   transform(value) {
//     return value.slice().reverse();
//   }
// }
