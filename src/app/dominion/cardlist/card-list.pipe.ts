import { Component, Pipe, PipeTransform } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';
import { CardProperty } from '../card-property';

@Pipe({
  name: 'cardPropertyForView',
})
export class CardListPipe implements PipeTransform {

  constructor(
    private mylib: MyLibraryService,
  ) { }

  transform( value, propertyName: string ) {
    switch (propertyName) {
      case 'no'          : return value;
      case 'name_jp'     : return value;
      case 'name_eng'    : return value;
      case 'set_name'    : return value;
      case 'category'    : return value;
      case 'card_type'   : return value;
      case 'cost_str'    : return value;
      case 'VP'          : return value;
      case 'draw_card'   : return value;
      case 'action'      : return value;
      case 'buy'         : return value;
      case 'coin'        : return value;
      case 'VPtoken'     : return value;
      case 'implemented' : return ( value ?  '実装済み' : '未実装' );
      default : return;
    }
  }
}
