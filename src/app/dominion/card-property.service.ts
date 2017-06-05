import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CardProperty } from "./card-property";


@Injectable()
export class CardPropertyHttpService {

  constructor(
    private http: Http,
    @Inject('HOST_NAME') private HOST_NAME: string
  ) { }

  private CardPropertyUrl = `${this.HOST_NAME}/api/CardPropertyList.php`;

  GetCardProperty(): Promise< CardProperty[] > {
    return this.http
      .get( this.CardPropertyUrl )
      .toPromise()
      .then( response => response.json().data as CardProperty[] )
      .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }

}
