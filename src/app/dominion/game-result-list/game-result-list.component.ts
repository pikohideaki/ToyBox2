import { Component, OnInit, Pipe } from '@angular/core';

import { GameResult } from "../game-result";
import { GetGameResultService } from '../get-game-result.service';

import { ItemsPerPageComponent, initializeItemsPerPageOption } from '../../noshiro-data-table/items-per-page/items-per-page.component';
import { PagenationComponent, getPagenatedData } from '../../noshiro-data-table/pagenation/pagenation.component';


@Component({
  providers: [GetGameResultService],
  selector: 'app-game-result-list',
  templateUrl: './game-result-list.component.html',
  styleUrls: [
    '../../noshiro-data-table/noshiro-data-table.component.css',
    './game-result-list.component.css'
  ]
})
export class GameResultListComponent implements OnInit {

  GameResultList: GameResult[] = [];

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
    private service: GetGameResultService
  ) {}

  ngOnInit() {
    this.itemsPerPage = this.itemsPerPageDefault;
    this.service.GetGameResult()
    .then( x => this.GameResultList = x )
    .then( () => console.log("http get done"))
  }

  getDetail(): void {
    console.log("getDetail");
  }
  editGameResult(): void {
    console.log("editGameResult");
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
