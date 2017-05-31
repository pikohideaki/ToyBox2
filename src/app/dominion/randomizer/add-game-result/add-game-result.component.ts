import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-game-result',
  templateUrl: './add-game-result.component.html',
  styleUrls: ['./add-game-result.component.css']
})
export class AddGameResultComponent implements OnInit {

    myDatepicker;
    place:string;
    places: string[] = [ '会室', 'piko house', '苗場' ];

    stateCtrl: FormControl;
    filteredPlaces: any;

    Players: any[] = [
        {
            name : '江島',
            selected : true,
            VP : 20,
        },
        {
            name : '能城',
            selected : true,
            VP : 11,
        },
        {
            name : '松麿',
            selected : true,
            VP : -3,
        },
        {
            name : '江島',
            selected : true,
            VP : 20,
        },
        {
            name : '白波瀬',
            selected : true,
            VP : 11,
        },
        {
            name : '松麿',
            selected : true,
            VP : -3,
        },
        {
            name : '江島',
            selected : true,
            VP : 20,
        },
        {
            name : '能城',
            selected : true,
            VP : 11,
        },
        {
            name : '白波瀬',
            selected : true,
            VP : -3,
        },
    ];

    startPlayerName;
    selectedPlayers: any[] = this.Players;

    fewerTurnsPlayerName;


    constructor() {
        this.stateCtrl = new FormControl();
        this.filteredPlaces = this.stateCtrl.valueChanges
            .startWith(null)
            .map( name => this.filterPlaces(name) );
    }

    ngOnInit() {
    }


    ngOnChanges( changes: SimpleChanges ) {
        // console.log( changes );
        if ( changes.startPlayerName != undefined ) {  // at http-get done
            console.log(this.startPlayerName)
        }
    }


    filterPlaces( val: string ) {
        return val ? this.places.filter(s => new RegExp(`^${val}`, 'yi').test(s))
                   : this.places;
    }

}
