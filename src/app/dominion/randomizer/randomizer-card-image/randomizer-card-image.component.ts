import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MyLibraryService } from '../../../my-library.service';
import { CardProperty } from "../../card-property";
import { DominionCardImageComponent } from "../../dominion-card-image/dominion-card-image.component";


@Component({
    selector: 'app-randomizer-card-image',
    templateUrl: './randomizer-card-image.component.html',
    styleUrls: ['./randomizer-card-image.component.css']
})
export class RandomizerCardImageComponent implements OnInit, OnChanges {

    @Input() SelectedCards : {
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

    SelectedCardsForView : {
        Prosperity      : boolean,
        DarkAges        : boolean,
        KingdomCards10  : { index: number, checked: boolean }[],
        BaneCard        : { index: number, checked: boolean }[],
        EventCards      : { index: number, checked: boolean }[],
        LandmarkCards   : { index: number, checked: boolean }[],
        Obelisk         : { index: number, checked: boolean }[],
        BlackMarketPile : { index: number, checked: boolean }[],
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


    Platinum: { data: CardProperty, checked: boolean };
    Colony  : { data: CardProperty, checked: boolean };


    @Input() CardPropertyList: CardProperty[];

    constructor(
        private mylib: MyLibraryService,
    ) { }

    ngOnInit() {
        this.Platinum = {
            checked : false,
            data    : this.CardPropertyList.find( e => e.card_ID === "Platinum" )
        }
        this.Colony = {
            checked : false,
            data    : this.CardPropertyList.find( e => e.card_ID === "Colony" )
        }
    }


    ngOnChanges( changes: SimpleChanges ) {
        if ( changes.SelectedCards != undefined ) {
            this.SelectedCardsForView.Prosperity = this.SelectedCards.Prosperity;
            this.SelectedCardsForView.DarkAges   = this.SelectedCards.DarkAges;
            this.SelectedCardsForView.KingdomCards10
            = this.SelectedCards.KingdomCards10
                .map( e => { return { index: e, checked: false } } );
            this.SelectedCardsForView.EventCards
            = this.SelectedCards.EventCards
                .map( e => { return { index: e, checked: false } } );
            this.SelectedCardsForView.LandmarkCards
            = this.SelectedCards.LandmarkCards
                .map( e => { return { index: e, checked: false } } );
            this.SelectedCardsForView.BaneCard
            = this.SelectedCards.BaneCard
                .map( e => { return { index: e, checked: false } } );
            this.SelectedCardsForView.Obelisk
            = this.SelectedCards.Obelisk
                .map( e => { return { index: e, checked: false } } );
            this.SelectedCardsForView.BlackMarketPile
            = this.SelectedCards.BlackMarketPile
                .map( e => { return { index: e, checked: false } } );
console.log(this.SelectedCardsForView)
        }
    }
}
