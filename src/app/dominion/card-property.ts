
import { CardCost } from './card-cost';

export class CardProperty {
    no                      : number;
    card_ID                 : string;
    name_jp                 : string;
    name_jp_yomi            : string;
    name_eng                : string;
    set_name                : string;
    cost                    : CardCost;
    category                : string;
    card_type               : string;
    VP                      : number;
    draw_card               : number;
    action                  : number;
    buy                     : number;
    coin                    : number;
    VPtoken                 : number;
    effect                  : string;
    description             : string;
    recommended_combination : string;
    memo                    : string;
    implemented             : boolean;
    randomizer_candidate    : boolean;

	constructor(
        no                      : number,
        card_ID                 : string,
        name_jp                 : string,
        name_jp_yomi            : string,
        name_eng                : string,
        set_name                : string,
        cost_coin               : number,
        cost_potion             : number,
        cost_debt               : number,
        category                : string,
        card_type               : string,
        VP                      : number,
        draw_card               : number,
        action                  : number,
        buy                     : number,
        coin                    : number,
        VPtoken                 : number,
        effect                  : string,
        description             : string,
        recommended_combination : string,
        memo                    : string,
        implemented             : boolean,
        randomizer_candidate    : boolean,
    ) {
        this.no                      = no;
        this.card_ID                 = card_ID;
        this.name_jp                 = name_jp;
        this.name_jp_yomi            = name_jp_yomi;
        this.name_eng                = name_eng;
        this.set_name                = set_name;
        this.cost                    = new CardCost( cost_coin, cost_potion, cost_debt );
        this.category                = category;
        this.card_type               = card_type;
        this.VP                      = VP;
        this.draw_card               = draw_card;
        this.action                  = action;
        this.buy                     = buy;
        this.coin                    = coin;
        this.VPtoken                 = VPtoken;
        this.effect                  = effect;
        this.description             = description;
        this.recommended_combination = recommended_combination;
        this.memo                    = memo;
        this.implemented             = implemented;
        this.randomizer_candidate    = randomizer_candidate;
    }




}



// [ToDo] method cannot be used when casted from an Object
// export function costStr(): string {
//     let costStr = '';
//     if ( this.cost.coin > 0 || ( this.cost.potion == 0 && this.cost.debt == 0 ) ) {
//         costStr += this.cost.coin.toString();
//     }
//     if ( this.cost.potion > 0 ) {
//         for ( let i = 0; i < this.cost.potion; ++i ) costStr += 'P';
//     }
//     if ( this.cost.debt   > 0 ) {
//         costStr += `<${this.cost.debt.toString()}>`;
//     }
//     return costStr;
// }



// export function forView(): any {
//     return {
//         no                      : this.no                      ,
//         card_ID                 : this.card_ID                 ,
//         name_jp                 : this.name_jp                 ,
//         name_jp_yomi            : this.name_jp_yomi            ,
//         name_eng                : this.name_eng                ,
//         set_name                : this.set_name                ,
//         cost_coin               : this.cost.coin               ,
//         cost_potion             : this.cost.potion             ,
//         cost_debt               : this.cost.debt               ,
//         cost_str                : this.costStr()               ,
//         category                : this.category                ,
//         card_type               : this.card_type               ,
//         VP                      : this.VP                      ,
//         draw_card               : this.draw_card               ,
//         action                  : this.action                  ,
//         buy                     : this.buy                     ,
//         coin                    : this.coin                    ,
//         VPtoken                 : this.VPtoken                 ,
//         effect                  : this.effect                  ,
//         description             : this.description             ,
//         recommended_combination : this.recommended_combination ,
//         memo                    : this.memo                    ,
//         implemented             : ( this.implemented ?  '実装済み' : '未実装' ),
//     };
// }
