import { Component, OnInit } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';
import { GameResult } from "../game-result";
import { GameResultListService } from '../http-game-result.service';


@Component({
  providers: [GameResultListService],
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {

    httpGetDone: boolean = false;
    GameResultList: GameResult[] = [];

    constructor(
        private httpGameResultListService: GameResultListService,

    ) { }

    ngOnInit() {
        this.httpGameResultListService.GetGameResultList()
        .then( data => {
            this.GameResultList = data;
            this.httpGetDone = true;
         } );
    }

}
