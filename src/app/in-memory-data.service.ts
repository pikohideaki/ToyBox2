import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let cardinfo = [
      { id: 1, name: 'aaa' },
      { id: 2, name: 'bbb' },
      { id: 3, name: 'ccc' },
    ];
    /* "id" is special key */
    return {cardinfo};
  }
}
