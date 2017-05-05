import { Component, OnInit, Inject, Input } from '@angular/core';

import { CardProperty } from '../card-property';

@Component({
  selector: 'card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.css']
})
export class CardImageComponent implements OnInit {

  private CARD_IMAGE_DIR_115x75  = `${this.DOMINION_DIR}/img/115x75`;
  private CARD_IMAGE_DIR_450x690 = `${this.DOMINION_DIR}/img/450x690`;

  constructor(
    @Inject('DOMINION_DATA_DIR') private DOMINION_DIR: string
  ) { }

  ngOnInit() {
    this.height = this.setHeight();
  }


  @Input() card: CardProperty;
  @Input() faceUp: boolean;
  @Input() fileSize: string;
  @Input() width: number;
  height: number;

  wideCardTypes = [ 'イベント', 'ランドマーク' ];


  sourceDir() {
    if ( !this.faceUp ) {
      return `${this.DOMINION_DIR}/s_Card_back.png`;
    } else {
      return `${this.CARD_IMAGE_DIR_450x690}/${this.card.name_eng.replace( / /g , '_' )}@2x.png`;
    }

    // switch ( this.fileSize ) {
    //   case '115x75'  :
    //     return `${this.CARD_IMAGE_DIR_115x75}/s_${this.card.name_eng.replace( / /g , '_' )}.png`;

    //   case '450x690' :
    //   default        :
    //     return `${this.CARD_IMAGE_DIR_450x690}/${this.card.name_eng.replace( / /g , '_' )}@2x.png`;
    // }
  }

  setHeight() {
    if ( this.wideCardTypes.findIndex( e => e == this.card.card_type ) != -1  ) {
      return this.width * 75 / 115;
    }
    return this.width * 115 / 75;
  }

}
