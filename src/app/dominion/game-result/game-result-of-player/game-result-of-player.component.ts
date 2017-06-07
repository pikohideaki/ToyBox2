import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MyLibraryService } from '../../../my-library.service';
import { MyDataTableComponent } from '../../../my-data-table/my-data-table.component';

import { GameResult } from "../../game-result";


@Component({
    selector: 'game-result-of-player',
    templateUrl: './game-result-of-player.component.html',
    styleUrls: [
        '../../../my-data-table/my-data-table.component.css',
        './game-result-of-player.component.css'
    ]
})
export class GameResultOfPlayerComponent implements OnInit, OnChanges {

    @Input() GameResultList: GameResult[] = [];

    constructor() { }

    ngOnInit() {
    }


    ngOnChanges( changes: SimpleChanges ) {
        if ( changes.GameResultList != undefined ) {  // at http-get done
            console.log( this.GameResultList );
        }
    }

}
