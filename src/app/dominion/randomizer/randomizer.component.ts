import { Component, OnInit } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';

import { MyDataTableComponent } from '../../my-data-table/my-data-table.component';

import { GetSetListService } from '../get-set-list.service';

import { CardProperty } from "../card-property";
import { GetCardPropertyService } from '../get-card-property.service';


@Component({
    providers: [MyLibraryService, GetSetListService, GetCardPropertyService],
    selector: 'app-randomizer',
    templateUrl: './randomizer.component.html',
    styleUrls: [
        '../../my-data-table/my-data-table.component.css',
        './randomizer.component.css'
    ]
})
export class RandomizerComponent implements OnInit {

    DominionSetList: { name: string, selected: boolean }[];
    CardPropertyList: CardProperty[] = [];
    SelectedCards : {
        KingdomCards : number[],
        Prosperity   : boolean,
        DarkAges     : boolean,
    } = {
        KingdomCards : [],
        Prosperity   : false,
        DarkAges     : false,        
    };
    constructor(
        private mylib: MyLibraryService,
        private httpGetSetListService: GetSetListService,
        private httpGetCardPropertyService: GetCardPropertyService,
    ) { }

    ngOnInit() {
        this.httpGetSetListService.GetSetList()
        .then( data => {
            this.DominionSetList = data.map( name => { return { name:name, selected:false } } );
        });

        this.httpGetCardPropertyService.GetCardProperty()
        .then( data => {
            this.CardPropertyList = data;
        });
    }

    selectAllToggle( $event ) {
        this.DominionSetList.forEach( DominionSet => DominionSet.selected = $event );
    }


    randomizer() {
        this.SelectedCards.KingdomCards
         = this.mylib.shuffle( this.CardPropertyList
            .filter( e => e.category == '王国' )
            .filter( e =>
                this.DominionSetList
                .filter( s => s.selected )
                .map( s => s.name )
                .findIndex( val => val == e.set_name ) >= 0 )
            .map( e => e.no )
        ).slice( 0, 10 );


        this.SelectedCards.Prosperity = ( this.CardPropertyList[ this.SelectedCards.KingdomCards[0] ].set_name === '繁栄' );
        this.SelectedCards.DarkAges   = ( this.CardPropertyList[ this.SelectedCards.KingdomCards[9] ].set_name === '暗黒時代' );


        // .sort();


        console.log( this.SelectedCards );
    }

}
