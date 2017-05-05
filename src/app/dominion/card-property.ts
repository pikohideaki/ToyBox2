
export class CardProperty {
  no                      : number;
  card_ID                 : string;
  name_jp                 : string;
  name_jp_yomi            : string;
  name_eng                : string;
  set_name                : string;
  cost_str                : string;
  cost_coin               : number;
  cost_potion             : number;
  cost_debt               : number;
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

	constructor(
    no                      : number,
    card_ID                 : string,
    name_jp                 : string,
    name_jp_yomi            : string,
    name_eng                : string,
    set_name                : string,
    cost_str                : string,
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
  ) {
    this.no                      = no;
    this.card_ID                 = card_ID;
    this.name_jp                 = name_jp;
    this.name_jp_yomi            = name_jp_yomi;
    this.name_eng                = name_eng;
    this.set_name                = set_name;
    this.cost_str                = cost_str;
    this.cost_coin               = cost_coin;
    this.cost_potion             = cost_potion;
    this.cost_debt               = cost_debt;
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
	}
}


// sample
// {
//   card_ID : 'name',
//   name_jp : 'aaa',
//   name_jp_yomi : 'aaa',
//   name_eng : 'aaa',
//   set_name : 'aaa',
//   cost_str : 'aaa',
//   cost_coin : 12,
//   cost_potion : 12,
//   cost_debt : 12,
//   category : 'aaa',
//   card_type : 'aaa',
//   VP : 45,
//   draw_card : 45,
//   action : 45,
//   buy : 45,
//   coin : 45,
//   VPtoken : 45,
//   effect1 : 'aaa',
//   effect2 : 'aaa',
//   effect3 : 'aaa',
//   effect4 : 'aaa',
//   implemented : 'aaa',
// }
