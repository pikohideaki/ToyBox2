import { Component, OnInit } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';

import { MyDataTableComponent } from '../../my-data-table/my-data-table.component';

import { DominionSetNameListHttpService } from '../http-set-list.service';

import { CardCost } from '../card-cost';
import { CardProperty } from "../card-property";
import { CardPropertyHttpService } from '../http-card-property.service';


@Component({
    providers: [MyLibraryService, DominionSetNameListHttpService, CardPropertyHttpService],
    selector: 'app-randomizer',
    templateUrl: './randomizer.component.html',
    styleUrls: [
        '../../my-data-table/my-data-table.component.css',
        './randomizer.component.css'
    ]
})
export class RandomizerComponent implements OnInit {

    AllSetsSelected: boolean = true;
    DominionSetNameList: { name: string, selected: boolean }[] = [];
    CardPropertyList: CardProperty[] = [];
    CardPropertyListForView: any[] = [];
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
        private httpDominionSetNameListService: DominionSetNameListHttpService,
        private httpCardPropertyService: CardPropertyHttpService,
    ) {}

    ngOnInit() {
        Promise.all( [
            this.httpDominionSetNameListService.GetSetNameList(),
            this.httpCardPropertyService.GetCardPropertyList()
        ] )
        .then( data => {
            this.DominionSetNameList = data[0].map( name => { return { name : name, selected : true } } );
            this.CardPropertyList = data[1] as CardProperty[];
            this.httpGetDone = true;

            if ( this.mylib.localStorage_has('DominionSetNameList') ) {
                let ls = this.mylib.localStorage_get('DominionSetNameList');
                this.DominionSetNameList.forEach( elm => {
                    let localValue = ls.find( e => e.name == elm.name );
                    if ( localValue ) { elm.selected = localValue.selected; }
                })
            }
        });
    }

    selectAllToggle( $event ) {
        this.DominionSetNameList.forEach( DominionSet => DominionSet.selected = this.AllSetsSelected );
    }



    randomizerClicked() {
        if ( this.DominionSetNameList.every( DominionSet => !DominionSet.selected ) ) return;
        this.randomizer();
        this.mylib.localStorage_set('DominionSetNameList', this.DominionSetNameList );
    }


    randomizer() {
        // reset
        this.SelectedCards = {
            KingdomCards10  : [],
            Prosperity      : false,
            DarkAges        : false,
            BaneCard        : [],
            EventCards      : [],
            LandmarkCards   : [],
            Obelisk         : [],
            BlackMarketPile : [],
        }

        // 選択されている拡張セットに含まれているカードすべてをシャッフルし，indexとペアにしたリスト
        let CardsInSelectedSets_Shuffled: { index: number, data: CardProperty }[]
         = this.mylib.shuffle(
            this.CardPropertyList
            .map( (val,index) => { return { index: index, data: val }; } )
            .filter ( e => e.data.randomizer_candidate )
            .filter( e =>
                this.DominionSetNameList
                .filter( s => s.selected )
                .map( s => s.name )
                .findIndex( val => val == e.data.set_name ) >= 0 )
           );

        // console.log(this.DominionSetNameList .filter( s => s.selected ) .map( s => s.name ))
        // console.log(CardsInSelectedSets_Shuffled.map( e => e.data.name_jp  ) );

        // 10 Supply KingdomCards10 and Event, LandmarkCards
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

        this.mylib.sortNumeric( this.SelectedCards.KingdomCards10 );  // 繁栄場・避難所場の決定後にソート
        this.mylib.sortNumeric( this.SelectedCards.EventCards );
        this.mylib.sortNumeric( this.SelectedCards.LandmarkCards );
        this.mylib.sortNumeric( this.SelectedCards.BlackMarketPile );
    }
}
