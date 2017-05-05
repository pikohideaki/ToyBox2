import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GameResult } from './game-result';


@Injectable()
export class GetGameResultService {

  constructor(
    private http: Http,
    @Inject('HOST_NAME') private HOST_NAME: string
  ) { }

  private GameResultUrl = `${this.HOST_NAME}/api/game_result.php`;

  GetGameResult(): Promise< GameResult[] > {
    return this.http
      .get( this.GameResultUrl )
      .toPromise()
      .then( response => response.json().data as GameResult[] )
      .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }

}
