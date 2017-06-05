import { Component, OnInit, Input } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { GameResult } from "../game-result";
import { GameResultListService } from '../game-result.service';


@Component({
    providers: [ GameResultListService ],
    selector: 'app-submit-game-result-dialog',
    templateUrl: './submit-game-result-dialog.component.html',
    styleUrls: [
        '../../my-data-table/my-data-table.component.css',
        './submit-game-result-dialog.component.css'
    ]
})
export class SubmitGameResultDialogComponent implements OnInit {

    @Input() date;
    @Input() place: string;
    @Input() Players: {
            name          : string,
            selected      : boolean,
            VP            : number,
            fewerTurns    : boolean,
        }[] = [];
    @Input() memo: string;
    @Input() SelectedCards: any;
    @Input() DominionSetNameList: { name: string, selected: boolean }[] = [];
    @Input() GameResultList: any[] = [];


    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
        private httpGameResultListService: GameResultListService,
    ) {}

    ngOnInit() {
        this.date = new Date( this.date );
    }

    Rank( selectedPlayers: any[] ) {
        
        return ;
    }

    submitGameResult(): Promise<any> {
        let gr = new GameResult();
        gr.no = this.GameResultList.length;
        gr.id = Date.now();
        gr.date = this.date;
        gr.place = this.place;
        gr.number_of_players = this.Players.map( e => e.selected ).length;
        gr.players = this.Rank( this.Players.map( e => e.selected ) );
        gr.memo = this.memo;
        gr.used_sets = this.DominionSetNameList.map( e => e.selected );
        gr.used_card_IDs = this.SelectedCards;

        console.log(gr);

        return this.httpGameResultListService
                .SetGameResult( this.GameResultList )
                .then( () => console.log("submit GameResultList done") );
    }
}
