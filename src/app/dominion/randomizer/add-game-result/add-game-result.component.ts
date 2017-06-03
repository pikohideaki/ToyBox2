import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../../my-library.service';

import { PlayersNameListService } from '../../get-players-name.service';

import { GameResult } from "../../game-result";
import { GameResultListService } from '../../get-game-result.service';

import { SubmitGameResultDialogComponent } from '../../submit-game-result-dialog/submit-game-result-dialog.component';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    providers: [MyLibraryService, PlayersNameListService, GameResultListService],
    selector: 'app-add-game-result',
    templateUrl: './add-game-result.component.html',
    styleUrls: [
        '../../../my-data-table/my-data-table.component.css',
        './add-game-result.component.css'
    ]
})
export class AddGameResultComponent implements OnInit {

    httpGetDone: boolean = false;


    date;

    place:string = "";
    places: string[] = [];
    stateCtrl: FormControl;
    filteredPlaces: any;

    GameResultList: GameResult[] = [];

    PlayersNameList: { name: string, name_yomi: string }[] = [];
    Players: {
            name          : string,
            selected      : boolean,
            VP            : number,
            fewerTurns    : boolean,
        }[] = [];

    startPlayerName: string = "";
    Memo: string = "";


    gameResult;

    selectPlayerNumAlert: boolean = false;


    constructor(
        private mylib: MyLibraryService,
        private httpPlayersNameListService: PlayersNameListService,
        private httpGameResultListService: GameResultListService,
        public dialog: MdDialog,
    ) {
        this.stateCtrl = new FormControl();
        this.filteredPlaces = this.stateCtrl.valueChanges
            .startWith(null)
            .map( name => this.filterPlaces(name) );
    }

    ngOnInit() {
        this.date = Date.now();
        Promise.all( [
            this.httpPlayersNameListService.GetPlayersNameList(),
            this.httpGameResultListService.GetGameResult(),
        ])
        .then( data => {
            this.PlayersNameList = data[0];
            this.GameResultList = data[1];

            this.Players = this.PlayersNameList.map( player => {
                return {
                    name : player.name,
                    selected : false,
                    VP : 0,
                    fewerTurns : false,
                };
            } );
            this.places = this.mylib.uniq( this.GameResultList.map( e => e.place ) ).filter( e => e != "" );
            this.filteredPlaces = this.stateCtrl.valueChanges
                        .startWith(null)
                        .map( name => this.filterPlaces(name) );
            this.httpGetDone = true;
        } );
    }



    filterPlaces( val: string ): string[] {
        return val ? this.places.filter( s => new RegExp(`^${val}`, 'yi').test(s) )
                   : this.places;
    }

    selectedPlayers(): any[] {
        return this.Players.filter( player => player.selected );
    }
    

    log(): void {
        console.log(
                'date' , this.date,
                'place' , this.place,
                'places' , this.places,
                'Players' , this.Players,
                'startPlayerName' , this.startPlayerName,
                'Memo' , this.Memo,
            );
    }


    selectStartPlayer(): void {
        if ( this.selectedPlayers().length < 1 ) return;
        this.startPlayerName = this.mylib.getRandomValue( this.selectedPlayers() ).name;
        console.log(this.startPlayerName);
    }


    selectedPlayersCountIsOK(): boolean {
        return ( 2 <= this.selectedPlayers().length && this.selectedPlayers().length <= 4 );
    }


    submitGameResult(): void {
        if ( !this.selectedPlayersCountIsOK() ) return;
        let dialogRef = this.dialog.open( SubmitGameResultDialogComponent, {
                height: '80%',
                width : '80%',
            });

        dialogRef.componentInstance.date    = this.date;
        dialogRef.componentInstance.place   = this.place;
        dialogRef.componentInstance.Players = this.Players;
        dialogRef.componentInstance.Memo    = this.Memo;
        dialogRef.componentInstance.GameResultList = this.GameResultList;
    }
}
