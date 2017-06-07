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

    playerNumOptions: { playerNum: number, selected: boolean }[] = [];

    dateBegin: Date;
    dateEnd: Date;

    constructor(
        private mylib: MyLibraryService,
        private httpGameResultListService: GameResultListService,
    ) { }

    ngOnInit() {
        this.httpGameResultListService.GetGameResultList()
        .then( data => {
            this.GameResultList = data;
            this.httpGetDone = true;

            // set default values
            this.playerNumOptions
                = this.mylib.uniq( this.GameResultList.map( e => e.numberOfPlayers ).sort() )
                            .map( v => { return { playerNum: v, selected: true }; } );

            // set default values
            this.dateBegin = this.mylib.front( this.GameResultList.map( e => e.date ) );
            this.dateEnd   = this.mylib.back ( this.GameResultList.map( e => e.date ) );
         } );
    }

}
