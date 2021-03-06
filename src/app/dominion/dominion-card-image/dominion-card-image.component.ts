import { Component, OnInit, Inject, Input } from '@angular/core';

import { CardProperty } from '../card-property';

@Component({
  selector: 'dominion-card-image',
  templateUrl: './dominion-card-image.component.html',
  styleUrls: ['./dominion-card-image.component.css']
})
export class DominionCardImageComponent implements OnInit {

  private CARD_IMAGE_DIR_115x75  = `${this.DOMINION_DIR}/img/115x75`;
  private CARD_IMAGE_DIR_450x690 = `${this.DOMINION_DIR}/img/450x690`;

  constructor(
    @Inject('DOMINION_DATA_DIR') private DOMINION_DIR: string
  ) { }

  ngOnInit() {
      if ( this.width  === undefined ) this.setWidth();
      if ( this.height === undefined ) this.setHeight();
  }


  @Input() card: CardProperty;
  @Input() faceUp: boolean;
  @Input() fileSize: string;
  @Input() width: number;
  @Input() height: number;
  @Input() isButton: boolean;


  wideCardTypes = [ 'イベント', 'ランドマーク' ];


  sourceDir() {
    if ( !this.faceUp ) {
      return `${this.DOMINION_DIR}/s_Card_back.png`;
    } else {
      return `${this.CARD_IMAGE_DIR_450x690}/${this.card.name_eng.replace( / /g , '_' ).replace( /'/g , '' )}@2x.png`;
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
            this.height = this.width * 75 / 115;  // wide
        } else {
            this.height = this.width * 115 / 75;
        }
    }

    setWidth() {
        if ( this.wideCardTypes.findIndex( e => e == this.card.card_type ) != -1  ) {
            this.width = this.height * 115 / 75;  // wide
        } else {
            this.width = this.height * 75 / 115;
        }
    }

}
