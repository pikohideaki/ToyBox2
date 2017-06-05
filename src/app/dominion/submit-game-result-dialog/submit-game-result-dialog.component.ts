import { Component, OnInit, Input } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { MyLibraryService } from '../../my-library.service';

import { GameResult } from "../game-result";
import { GameResultListService } from '../game-result.service';
import { ScoringService } from './scoring.service';

@Component({
    providers: [ MyLibraryService, GameResultListService, ScoringService ],
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
    // scoringMap: Map< {playerNum: number, rank: number }, number >;
    defaultScores: number[][] = [];

    playerResult: {
        name      : string,
        VP        : number,
        lessTurns : boolean,
        rank      : number,
        score     : number,
    }[] = [];


    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
        private mylib: MyLibraryService,
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

        this.httpScoringService.GetScoringList()
        .then( data => {
            this.defaultScores = data;
            this.rankPlayers();
            this.scorePlayers();
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
        // 同着に対応
        let scoringTemp: number[] = this.defaultScores[this.playerResult.length];
        {
            let pl = this.playerResult;  // alias; playerResult is sorted by rank
            let count: number = 0;
            let sum: number = 0;
            let k = 0;
            for ( let i = 0; i < pl.length; ++i ) {
                count++;
                sum += this.defaultScores[pl.length][k++];
                if ( i === pl.length - 1 || pl[i].rank !== pl[i + 1].rank ) {
                    scoringTemp[ pl[i].rank ] = this.mylib.roundAt( sum / count, 3 );
                    count = 0;  // reset
                    sum = 0;  // reset
                }
            }
        }

        // write back
        this.playerResult.forEach( e => { e.score = scoringTemp[ e.rank ]; } );
    }


    submitGameResult(): Promise<any> {
        let gr = new GameResult();
        gr.no                   = this.GameResultList.length + 1;
        gr.id                   = Date.now();
        gr.date                 = this.date;
        gr.place                = this.place;
        gr.numberOfPlayers      = this.selectedPlayers.length;
        gr.players              = this.playerResult;
        gr.memo                 = this.memo;
        gr.selectedDominionSets = this.DominionSetNameList.map( e => e.selected );
        gr.usedCardIDs          = this.SelectedCards;

        console.log(gr, this.mylib.back( this.GameResultList ) );

        return this.httpGameResultListService
                .SetGameResult( this.GameResultList )
                .then( () => console.log("submit GameResultList done") );
    }
}
