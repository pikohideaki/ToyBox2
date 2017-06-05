import { Component, OnInit, Input } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { GameResult } from "../game-result";
import { GameResultListService } from '../game-result.service';
import { ScoringService } from './scoring.service';

@Component({
    providers: [ GameResultListService, ScoringService ],
    selector: 'app-submit-game-result-dialog',
    templateUrl: './submit-game-result-dialog.component.html',
    styleUrls: [
        '../../my-data-table/my-data-table.component.css',
        './submit-game-result-dialog.component.css'
    ]
})
export class SubmitGameResultDialogComponent implements OnInit {

    @Input() date: Date;
    @Input() place: string;
    @Input() selectedPlayers: {
            name         : string,
            selected     : boolean,
            VP           : number,
            lessTurns    : boolean,
        }[] = [];
    @Input() memo: string;
    @Input() SelectedCards: any;
    @Input() DominionSetNameList: { name: string, selected: boolean }[] = [];
    @Input() GameResultList: any[] = [];

    // scoringMap: Map< string, number >;
    scoringMap: Map< {playerNum: number, rank: number }, number >;

    playerResult: {
        name      : string,
        VP        : number,
        lessTurns : boolean,
        rank      : number,
        score     : number,
    }[] = [];


    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
        private httpGameResultListService: GameResultListService,
        private httpScoringService: ScoringService
    ) {}

    ngOnInit() {
        this.playerResult = this.selectedPlayers.map( e => {
            return {
                name      : e.name,
                VP        : e.VP,
                lessTurns : e.lessTurns,
                rank      : 0,
                score     : 0,
            };
        });
        // console.log( this.playerResult[0] );

        this.httpScoringService.GetScoringList()
        .then( data => {
            console.log(data);
            this.scoringMap = data;
            console.log(this.scoringMap);
            this.rankPlayers();
            for ( let i = 0; i < 6; ++i ) for ( let j = 0; j < 6; ++j ) {
                console.log( i, j, this.scoringMap.has( {playerNum:i, rank:j} ) );
                // console.log( i, j, this.scoringMap.has( `${i},${j}` ) );
            }
            // this.scorePlayers();
            // console.log( "after score", this.playerResult );
        });
    }

    rankPlayers() {
        let sp = this.selectedPlayers;  // alias

        this.playerResult.forEach( e => e.rank = 0 );  // initialize ranks

        for ( let j = 1; j < sp.length; j++ ) {
        for ( let i = 0; i < j; i++ ) {
            // 自分よりもVPが大きい要素があるごとにrank++. 等しいときは何もしない.
            if ( sp[j].VP > sp[i].VP ) { this.playerResult[i].rank++; }
            if ( sp[j].VP < sp[i].VP ) { this.playerResult[j].rank++; }
            if ( sp[j].VP === sp[i].VP ) {
                if ( sp[j].lessTurns ) { this.playerResult[i].rank++; }
                if ( sp[i].lessTurns ) { this.playerResult[j].rank++; }
            }
        }}

        this.playerResult.sort( (a,b) => (a.rank - b.rank) );
    }

    scorePlayers() {
        // this.playerResult
        // .forEach( e => {
        //     e.score = this.scoringMap.get( {playerNum : this.playerResult.length, rank : e.rank } )
        //     console.log([this.playerResult.length, e.rank], e.score)
        //  } );
    }


    submitGameResult(): Promise<any> {
        let gr = new GameResult();
        gr.no                = this.GameResultList.length;
        gr.id                = Date.now();
        gr.date              = this.date;
        gr.place             = this.place;
        gr.number_of_players = this.selectedPlayers.length;
        gr.players           = this.playerResult;
        gr.memo              = this.memo;
        gr.used_sets         = this.DominionSetNameList.map( e => e.selected );
        gr.used_card_IDs     = this.SelectedCards;

        console.log(gr);

        return this.httpGameResultListService
                .SetGameResult( this.GameResultList )
                .then( () => console.log("submit GameResultList done") );
    }
}
