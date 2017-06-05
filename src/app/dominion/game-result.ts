
export class GameResult {
    no                : number;
    id                : number;
    date              : Date;
    place             : string;
    number_of_players : number;
    players           : {
            name       : string;
            VP         : number;
            lessTurns : boolean;
            rank       : number;
            score      : number;
        }[];
    memo              : string;
    used_sets         : boolean[];
    used_card_IDs     : {
        Prosperity   : boolean;
        DarkAges     : boolean;
        KingdomCards : string[];
        BaneCard     : string;
        EventCards   : string[];
        Obelisk      : string;
        Landmark     : string[];
        BlackMarket  : string[];
    }

    constructor( grObj? ) {
        if ( grObj == undefined ) return;
        this.no                = grObj.no;
        this.id                = grObj.id;
        this.date              = new Date( grObj.date );
        this.place             = grObj.place;
        this.number_of_players = grObj.number_of_players;
        this.players           = grObj.players;
        this.memo              = grObj.memo;
        this.used_sets         = grObj.used_sets;
        this.used_card_IDs     = grObj.used_card_IDs;
    }
}

