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

  private CardPropertyListUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=CardPropertyList.json`;

  GetCardPropertyList(): Promise< CardProperty[] > {
        return this.http
            .get( this.CardPropertyListUrl )
            .toPromise()
            .then( response => {
                let result: CardProperty[] = [];
                let CardPropertyListObj = response.json().data;
                CardPropertyListObj.forEach( cpObj => result.push( new CardProperty( cpObj ) ) );
                console.log( "GetCardPropertyList Done." );
                return result;
            })
            .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }

}
