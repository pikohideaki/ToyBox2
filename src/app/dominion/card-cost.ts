
export class CardCost {
  coin   : number = 0;
  potion : number = 0;
  debt   : number = 0;

  constructor( coin: number, potion: number, debt: number ) {
    this.coin   = coin;
    this.potion = potion;
    this.debt   = debt;
  }

}
