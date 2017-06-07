import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { MdDialog } from '@angular/material';


import { MyLibraryService } from '../../../my-library.service';
import { PlayersNameListService } from '../../players-name.service';
import { GameResult } from "../../game-result";
import { GameResultListService } from '../../game-result.service';
import { SubmitGameResultDialogComponent } from '../../submit-game-result-dialog/submit-game-result-dialog.component';


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


    date: Date;

    place:string = "";
    places: string[] = [];
    stateCtrl: FormControl;
    filteredPlaces: any;

    GameResultList: GameResult[] = [];

    PlayersNameList: { name: string, name_yomi: string }[] = [];
    Players: {
            name      : string,
            selected  : boolean,
            VP        : number,
            lessTurns : boolean,
        }[] = [];

    startPlayerName: string = "";
    memo: string = "";


    @Input() SelectedCards;
    @Input() DominionSetNameList: { name: string, selected: boolean }[] = [];


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
        this.date = new Date( Date.now() );
        Promise.all( [
            this.httpPlayersNameListService.GetPlayersNameList(),
            this.httpGameResultListService.GetGameResultList(),
        ])
        .then( data => {
            this.PlayersNameList = data[0];
            this.GameResultList = data[1];

            this.Players = this.PlayersNameList.map( player => {
                return {
                    name      : player.name,
                    selected  : false,
                    VP        : 0,
                    lessTurns : false,
                };
            } );
            this.places = this.mylib.uniq( this.GameResultList.map( e => e.place ) )
                                    .filter( e => e != "" );
            this.filteredPlaces = this.stateCtrl.valueChanges
                        .startWith(null)
                        .map( name => this.filterPlaces(name) );
            this.httpGetDone = true;
        } );
    }



    filterPlaces( val: string ): string[] {
        // return val ? this.places.filter( s => new RegExp(`^${val}`, 'yi').test(s) )
        //            : this.places;
        return val ? this.places.filter( s => this.mylib.submatch( s, val, true ) )
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
                'Memo' , this.memo,
            );
    }


    selectStartPlayer(): void {
        if ( this.selectedPlayers().length < 1 ) return;
        this.startPlayerName = this.mylib.getRandomValue( this.selectedPlayers() ).name;
    }


    playerNumAlert(): boolean {
        return ( 2 <= this.selectedPlayers().length && this.selectedPlayers().length <= 4 );
    }


    submitGameResult(): void {
        if ( !this.playerNumAlert() ) return;
        let dialogRef = this.dialog.open( SubmitGameResultDialogComponent, {
                height: '80%',
                width : '80%',
            });

        dialogRef.componentInstance.date                = this.date;
        dialogRef.componentInstance.place               = this.place;
        dialogRef.componentInstance.selectedPlayers     = this.selectedPlayers();
        dialogRef.componentInstance.memo                = this.memo;
        dialogRef.componentInstance.SelectedCards       = this.SelectedCards;
        dialogRef.componentInstance.DominionSetNameList = this.DominionSetNameList;
        dialogRef.componentInstance.GameResultList      = this.GameResultList;

        dialogRef.afterClosed().subscribe(result => {
            if ( result == "OK Clicked" ) {
                this.Players.forEach( pl => {
                    pl.lessTurns = false;
                    pl.VP = 0;
                });
                this.memo = "";
                this.startPlayerName = "";
            }
        });
    }
}
