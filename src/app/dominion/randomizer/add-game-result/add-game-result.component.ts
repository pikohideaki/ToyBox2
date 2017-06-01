import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../../my-library.service';

import { GetPlayersNameListService } from '../../get-players-name.service';

import { GameResult } from "../../game-result";
import { GetGameResultService } from '../../get-game-result.service';

import { SubmitGameResultDialogComponent } from '../../submit-game-result-dialog/submit-game-result-dialog.component';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    providers: [MyLibraryService, GetPlayersNameListService, GetGameResultService],
    selector: 'app-add-game-result',
    templateUrl: './add-game-result.component.html',
    styleUrls: [
        '../../../my-data-table/my-data-table.component.css',
        './add-game-result.component.css'
    ]
})
export class AddGameResultComponent implements OnInit {

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
    memo: string = "";


    gameResult;

    selectPlayerNumAlert: boolean = false;

    constructor(
        private mylib: MyLibraryService,
        private httpGetPlayersNameListService: GetPlayersNameListService,
        private httpGetGameResultService: GetGameResultService,
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
            this.httpGetPlayersNameListService.GetPlayersNameList(),
            this.httpGetGameResultService.GetGameResult(),
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
                'memo' , this.memo,
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
        this.gameResult = "test";
        dialogRef.componentInstance.gameResult = this.gameResult;
    }
}
