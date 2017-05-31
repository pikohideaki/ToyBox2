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

    AllSetsSelected: boolean = true;
    DominionSetList: { name: string, selected: boolean }[] = [];
    CardPropertyList: CardProperty[] = [];
    httpGetDone: boolean = false;

    SelectedCards : {
        KingdomCards10  : number[],
        Prosperity      : boolean,
        DarkAges        : boolean,
        BaneCard        : number[],
        EventCards      : number[],
        LandmarkCards   : number[],
        Obelisk         : number[],
        BlackMarketPile : number[],
    } = {
        KingdomCards10  : [],
        Prosperity      : false,
        DarkAges        : false,
        BaneCard        : [],
        EventCards      : [],
        LandmarkCards   : [],
        Obelisk         : [],
        BlackMarketPile : [],
    };

    constructor(
        private mylib: MyLibraryService,
        private httpGetSetListService: GetSetListService,
        private httpGetCardPropertyService: GetCardPropertyService,
    ) { }

    ngOnInit() {
        Promise.all( [
            this.httpGetSetListService.GetSetList(),
            this.httpGetCardPropertyService.GetCardProperty()
        ] )
        .then( data => {
            this.DominionSetList = data[0].map( name => { return { name : name, selected : true } } );
            this.CardPropertyList = data[1];
            this.httpGetDone = true;
            console.log("GetSetList, GetCardProperty done");
        });
    }

    selectAllToggle( $event ) {
        this.DominionSetList.forEach( DominionSet => DominionSet.selected = this.AllSetsSelected );
    }



    randomizerClicked() {
        if ( this.DominionSetList.every( DominionSet => !DominionSet.selected ) ) return;
        this.randomizer();
    }


    randomizer() {
        // reset
        this.SelectedCards.KingdomCards10  = [];
        this.SelectedCards.EventCards      = [];
        this.SelectedCards.LandmarkCards   = [];
        this.SelectedCards.Prosperity      = false;
        this.SelectedCards.DarkAges        = false;
        this.SelectedCards.BaneCard        = [];
        this.SelectedCards.Obelisk         = [];
        this.SelectedCards.BlackMarketPile = [];

        // 選択されている拡張セットに含まれているカードすべてをシャッフルし，indexとペアにしたリスト
        let CardsInSelectedSets_Shuffled: any[]
         = this.mylib.shuffle(
            this.CardPropertyList
            .map( (val,index) => { return { index: index, data: val }; } )
            .filter ( e => e.data.randomizer_candidate )
            .filter( e =>
                this.DominionSetList
                .filter( s => s.selected )
                .map( s => s.name )
                .findIndex( val => val == e.data.set_name ) >= 0 )
           );

        // console.log(this.DominionSetList .filter( s => s.selected ) .map( s => s.name ))
        // console.log(CardsInSelectedSets_Shuffled.map( e => e.data.name_jp  ) );

        // 10 Supply KingdomCards and Event, Landmark
        while ( this.SelectedCards.KingdomCards10.length < 10 ) {
            let card = CardsInSelectedSets_Shuffled.pop();
            if ( card.data.category == '王国' ) {
                this.SelectedCards.KingdomCards10.push( card.index );
            }
            if ( (this.SelectedCards.EventCards.length + this.SelectedCards.LandmarkCards.length ) < 2 ) {
                if ( card.data.card_type == 'イベント' ) {
                    this.SelectedCards.EventCards.push( card.index );
                }
                if ( card.data.card_type == 'ランドマーク' ) {
                    this.SelectedCards.LandmarkCards.push( card.index );
                }
            }
        }


        // 繁栄場・避難所場の決定
        this.SelectedCards.Prosperity = ( this.CardPropertyList[ this.SelectedCards.KingdomCards10[0] ].set_name === '繁栄' );
        this.SelectedCards.DarkAges   = ( this.CardPropertyList[ this.SelectedCards.KingdomCards10[9] ].set_name === '暗黒時代' );

        // this.SelectedCards.KingdomCards10.sort();  // 繁栄場・避難所場の決定後にソート


        // 災いカード（収穫祭：魔女娘）
        if ( this.SelectedCards.KingdomCards10
                .findIndex( e => this.CardPropertyList[e].name_jp == '魔女娘' ) >= 0 )
        {
            this.SelectedCards.BaneCard
            = [ this.mylib.removeIf( CardsInSelectedSets_Shuffled, e => (
                           e.data.cost.debt   == 0
                        && e.data.cost.potion == 0
                        && e.data.cost.coin   >= 2
                        && e.data.cost.coin   <= 3 ) ).index ];
        }

        // Black Market (one copy of each Kingdom card not in the supply. 15種類選択を推奨)
        if ( this.SelectedCards.KingdomCards10
                .findIndex( e => this.CardPropertyList[e].name_jp == '闇市場' ) >= 0 )
        {
            while ( this.SelectedCards.BlackMarketPile.length < 15 ) {
                let card = CardsInSelectedSets_Shuffled.pop();
                if ( card.data.category == '王国' ) {
                    this.SelectedCards.BlackMarketPile.push( card.index );
                }
            }
        }

        // Obelisk (Choose 1 Action Supply Pile)
        if ( this.SelectedCards.LandmarkCards
                .findIndex( e => this.CardPropertyList[e].name_eng == 'Obelisk' ) >= 0 )
        {
            this.SelectedCards.Obelisk = ( () => {
                let supplyUsed: number[] = [].concat( this.SelectedCards.KingdomCards10, this.SelectedCards.BaneCard );
                let ObeliskCandidatesActionCards: number[] = this.mylib.copy( supplyUsed );
                if ( supplyUsed.findIndex( e => this.CardPropertyList[e].card_type.includes('略奪者') ) >= 0 ) {
                    let ruinsIndex: number = this.CardPropertyList.findIndex( e => e.name_jp == '廃墟' );
                    ObeliskCandidatesActionCards.unshift( ruinsIndex );
                }
                return [this.mylib.getRandomValue( supplyUsed )];
            } )();
        }

        console.log( 'KingdomCards10' , this.SelectedCards.KingdomCards10 .map( e => this.CardPropertyList[e].name_jp ) );
        console.log( 'EventCards'     , this.SelectedCards.EventCards     .map( e => this.CardPropertyList[e].name_jp ) );
        console.log( 'LandmarkCards'  , this.SelectedCards.LandmarkCards  .map( e => this.CardPropertyList[e].name_jp ) );
        console.log( 'BlackMarketPile', this.SelectedCards.BlackMarketPile.map( e => this.CardPropertyList[e].name_jp ) );
        console.log( 'BaneCard'       , this.SelectedCards.BaneCard       .map( e => this.CardPropertyList[e].name_jp ) );
        console.log( 'Obelisk'        , this.SelectedCards.Obelisk        .map( e => this.CardPropertyList[e].name_jp ) );

    }

}
