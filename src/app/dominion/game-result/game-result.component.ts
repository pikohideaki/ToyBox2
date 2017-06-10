import { Component, OnInit, Inject } from '@angular/core';

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
    GameResultListFiltered: GameResult[] = [];

    playerNumOptions: { playerNum: number, selected: boolean }[] = [];


    dateBegin: Date;
    dateEnd  : Date;

    GetGameResultListUrl = `${this.HOST_NAME}/api/GameResultList.json`;
    // private GetGameResultListUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=GameResultList.json&jsonPrettyPrint=true`;
    // private GetGameResultListUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=GameResultList.json`;


    constructor(
        private mylib: MyLibraryService,
        private httpGameResultListService: GameResultListService,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) {
        this.dateBegin = new Date();
        this.dateEnd   = new Date();
    }

    ngOnInit() {
        this.httpGameResultListService.GetGameResultList()
        .then( data => {
            this.GameResultList = data;
            this.httpGetDone = true;
            // set default values
            this.playerNumOptions
                = this.mylib.uniq( this.GameResultList.map( e => e.players.length ).sort() )
                            .map( v => { return { playerNum: v, selected: true }; } );

            this.resetFilter();
         } );
    }


    filterGameResultList() {
        let playerNumIsSelected = {};
        this.playerNumOptions.forEach( e => playerNumIsSelected[e.playerNum] = e.selected );

        this.GameResultListFiltered = this.GameResultList.filter(
            gr => (    this.mylib.getMidnightOfDate( gr.date ) >= this.dateBegin
                    && this.mylib.getMidnightOfDate( gr.date ) <= this.dateEnd
                    && playerNumIsSelected[gr.players.length] )
        );
    }

    latestResult() {
        let latestDate = new Date( this.mylib.back( this.GameResultList.map( e => e.date ) ) );
        this.dateEnd   = this.mylib.getMidnightOfDate( latestDate );
        this.dateBegin = this.mylib.getMidnightOfDate( latestDate );
        this.filterGameResultList();
    }

    resetFilter() {
        // set default values (don't use setDate() to avoid letting ngModel sleep)
        this.dateBegin = this.mylib.getMidnightOfDate( this.mylib.front( this.GameResultList.map( e => e.date ) ) );
        this.dateEnd   = this.mylib.getMidnightOfDate( this.mylib.back ( this.GameResultList.map( e => e.date ) ) );
        this.playerNumOptions.forEach( e => e.selected = true );
        this.filterGameResultList();
    }

}
