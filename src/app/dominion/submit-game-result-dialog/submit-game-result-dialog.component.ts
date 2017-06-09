import { Component, OnInit, Input } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { MyLibraryService } from '../../my-library.service';

import { GameResult } from "../game-result";
import { GameResultListService } from '../http-game-result.service';
import { ScoringService } from '../http-scoring.service';
import { CardProperty } from "../card-property";

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
    @Input() SelectedCards: {
        KingdomCards10  : number[],
        Prosperity      : boolean,
        DarkAges        : boolean,
        BaneCard        : number[],
        EventCards      : number[],
        LandmarkCards   : number[],
        Obelisk         : number[],
        BlackMarketPile : number[],
    };
    @Input() CardPropertyList: CardProperty[] = [];

    @Input() DominionSetNameList: { name: string, selected: boolean }[] = [];
    @Input() GameResultList: GameResult[] = [];

    // defaultScores: number[][] = [];


    newGameResult: GameResult;

    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
        private mylib: MyLibraryService,
        private httpGameResultListService: GameResultListService,
        private httpScoringService: ScoringService
    ) {
    }

    ngOnInit() {
        this.newGameResult = new GameResult({
            no                   : this.GameResultList.length + 1,
            id                   : Date.now(),
            date                 : this.date,
            place                : this.place,
            memo                 : this.memo,
            selectedDominionSets : this.DominionSetNameList.map( e => e.selected ),
            usedCardIDs          : {
                Prosperity      : this.SelectedCards.Prosperity      ,
                DarkAges        : this.SelectedCards.DarkAges        ,
                KingdomCards10  : this.SelectedCards.KingdomCards10 .map( index => this.CardPropertyList[index].card_ID ),
                BaneCard        : this.SelectedCards.BaneCard       .map( index => this.CardPropertyList[index].card_ID ),
                EventCards      : this.SelectedCards.EventCards     .map( index => this.CardPropertyList[index].card_ID ),
                Obelisk         : this.SelectedCards.Obelisk        .map( index => this.CardPropertyList[index].card_ID ),
                LandmarkCards   : this.SelectedCards.LandmarkCards  .map( index => this.CardPropertyList[index].card_ID ),
                BlackMarketPile : this.SelectedCards.BlackMarketPile.map( index => this.CardPropertyList[index].card_ID ),
            },
            players : this.selectedPlayers.map( pl => {
                            return {
                                name      : pl.name,
                                VP        : pl.VP,
                                lessTurns : pl.lessTurns,
                                rank      : 1,
                                score     : 0,
                            }
                        }),
        });

        this.httpScoringService.GetScoringList()
        .then( data => {
            let defaultScores = data;
            this.newGameResult.rankPlayers();
            this.newGameResult.setScores( defaultScores );
        });
    }



    submitGameResult(): Promise<any> {
        this.GameResultList.push( this.newGameResult );

        return this.httpGameResultListService
                .SetGameResultList( this.GameResultList )
                .then( () => {
                    console.log("submit GameResultList done");
                });
    }
}
