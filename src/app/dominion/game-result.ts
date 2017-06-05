
export class GameResult {
    no              : number;
    id              : number;
    date            : Date;
    place           : string;
    numberOfPlayers : number;
    players           : {
            name      : string;
            VP        : number;
            lessTurns : boolean;
            rank      : number;
            score     : number;
        }[];
    memo                 : string;
    selectedDominionSets : boolean[];
    usedCardIDs          : {
        Prosperity   : boolean;
        DarkAges     : boolean;
        KingdomCards : string[];
        BaneCard     : string[];
        EventCards   : string[];
        Obelisk      : string[];
        Landmark     : string[];
        BlackMarket  : string[];
    }

    constructor( grObj? ) {
        if ( grObj == undefined ) return;
        this.no                   = grObj.no;
        this.id                   = grObj.id;
        this.date                 = new Date( grObj.date );
        this.place                = grObj.place;
        this.numberOfPlayers      = grObj.number_of_players;
        this.players              = grObj.players;
        this.memo                 = grObj.memo;
        this.selectedDominionSets = grObj.used_sets;
        this.usedCardIDs          = grObj.used_card_IDs;
    }
}

