import { Component, OnInit, Input } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { GameResult } from "../game-result";
import { GameResultListService } from '../get-game-result.service';


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
    @Input() Players: any[] = [];
    @Input() Memo: string;

    @Input() GameResultList: any[] = [];


    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
        private httpGameResultListService: GameResultListService,
    ) {}

    ngOnInit() {
        this.date = new Date( this.date );
    }

    submitGameResult(): Promise<any> {
        console.log( this.GameResultList );
        return this.httpGameResultListService
                .SetGameResult( this.GameResultList )
                .then( () => console.log("submit GameResultList done") );
    }
}
