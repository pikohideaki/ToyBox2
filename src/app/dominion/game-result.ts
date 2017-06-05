
export class GameResult {
    no                : number;
    id                : number;
    date              : string;
    place             : string;
    number_of_players : number;
    players           : {
            name       : string;
            VP         : number;
            less_turns : boolean;
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

    constructor() {}
}

