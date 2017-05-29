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
        KingdomCards    : number[],
        Prosperity      : boolean,
        DarkAges        : boolean,
        BaneCard        : number,
        EventCards      : number[],
        LandmarkCards   : number[],
        Obelisk         : number,
        BlackMarketPile : number[],
    } = {
        KingdomCards    : [],
        Prosperity      : false,
        DarkAges        : false,
        BaneCard        : 0,
        EventCards      : [],
        LandmarkCards   : [],
        Obelisk         : 0,
        BlackMarketPile : [],
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
        // reset
        this.SelectedCards.KingdomCards    = [];
        this.SelectedCards.Prosperity      = false;
        this.SelectedCards.DarkAges        = false;
        this.SelectedCards.BaneCard        = 0;
        this.SelectedCards.EventCards      = [];
        this.SelectedCards.LandmarkCards   = [];
        this.SelectedCards.Obelisk         = 0;
        this.SelectedCards.BlackMarketPile = [];


        // 選択されている拡張セットに含まれているカードすべてをシャッフルし，indexとペアにしたリスト
        const RandomSelectedShuffled
         = this.mylib.shuffle(
            this.CardPropertyList
            .map( (val,index) => { return { index: index, data: val }; } )
            .filter( e =>
                this.DominionSetList
                .filter( s => s.selected )
                .map( s => s.name )
                .findIndex( val => val == e.data.set_name ) >= 0 )
         );

        // KingdomCards
        this.SelectedCards.KingdomCards
         = RandomSelectedShuffled
            .filter( e => e.data.category == '王国' )
            .slice( 0, 10 )
            .map( e => e.index );

        // 繁栄場・避難所場の決定
        this.SelectedCards.Prosperity = ( this.CardPropertyList[ this.SelectedCards.KingdomCards[0] ].set_name === '繁栄' );
        this.SelectedCards.DarkAges   = ( this.CardPropertyList[ this.SelectedCards.KingdomCards[9] ].set_name === '暗黒時代' );

        this.SelectedCards.KingdomCards.sort();  // 繁栄場・避難所場の決定後にソート


        // 災いカード（収穫祭：魔女娘）
        this.SelectedCards.BaneCard
         = this.mylib.getRandomValue(
            RandomSelectedShuffled
                .filter( e => e.data.category == '王国' )
                .slice(11)
                .filter( e => (
                       e.data.cost.debt   == 0
                    && e.data.cost.potion == 0
                    && e.data.cost.coin   >= 2
                    && e.data.cost.coin   <= 3 ) )
                .map( e => e.index )
            );


        // Event Cards & Landmark Cards
        RandomSelectedShuffled
            .filter( e => e.data.card_type == 'イベント' || e.data.card_type == 'ランドマーク' )
            .slice( 0, this.mylib.RandomNumber(0,2) )
            .forEach( e => {
                if ( e.data.card_type == 'イベント' ) {
                    this.SelectedCards.EventCards.push( e.index );
                } else if ( e.data.card_type == 'ランドマーク' ) {
                    this.SelectedCards.LandmarkCards.push( e.index );
                }
            });

        // Black Market

        // Obelisk (Choose 1 Action Supply Pile)

        console.log(
            this.SelectedCards.KingdomCards.map( e => this.CardPropertyList[e].name_jp ),
            this.CardPropertyList[ this.SelectedCards.BaneCard ].name_jp,
            this.SelectedCards.EventCards.map( e => this.CardPropertyList[e].name_jp ),
            this.SelectedCards.LandmarkCards.map( e => this.CardPropertyList[e].name_jp ),
        );

    }

}
