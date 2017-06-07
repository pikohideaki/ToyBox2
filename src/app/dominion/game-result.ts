
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
        Object.keys( grObj )
            .filter( key => key != "date" )
            .forEach( key => this[key] = grObj[key] );

        this.date = new Date( grObj.date );
    }
}

