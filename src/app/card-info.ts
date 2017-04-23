export class CardInfo {
  name_jp       :string;
  name_jp_yomi  :string;
  name_eng      :string;
  set_name      :string;
  cost_str      :string;
  cost_coin     :number;
  cost_potion   :number;
  cost_debt     :number;
  category      :string;
  card_type     :string;
  VP            :number;
  draw_card     :number;
  action        :number;
  buy           :number;
  coin          :number;
  VPtoken       :number;
  effect1       :string;
  effect2       :string;
  effect3       :string;
  effect4       :string;
  implemented   :string;

	constructor( 
    name_jp       :string,
    name_jp_yomi  :string,
    name_eng      :string,
    set_name      :string,
    cost_str      :string,
    cost_coin     :number,
    cost_potion   :number,
    cost_debt     :number,
    category      :string,
    card_type     :string,
    VP            :number,
    draw_card     :number,
    action        :number,
    buy           :number,
    coin          :number,
    VPtoken       :number,
    effect1       :string,
    effect2       :string,
    effect3       :string,
    effect4       :string,
    implemented   :string,
  ) {
    this.name_jp       = name_jp;
    this.name_jp_yomi  = name_jp_yomi;
    this.name_eng      = name_eng;
    this.set_name      = set_name;
    this.cost_str      = cost_str;
    this.cost_coin     = cost_coin;
    this.cost_potion   = cost_potion;
    this.cost_debt     = cost_debt;
    this.category      = category;
    this.card_type     = card_type;
    this.VP            = VP;
    this.draw_card     = draw_card;
    this.action        = action;
    this.buy           = buy;
    this.coin          = coin;
    this.VPtoken       = VPtoken;
    this.effect1       = effect1;
    this.effect2       = effect2;
    this.effect3       = effect3;
    this.effect4       = effect4;
    this.implemented   = implemented;
	}
}


// sample
// {
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
