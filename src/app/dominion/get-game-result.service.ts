import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GameResult } from './game-result';


@Injectable()
export class GameResultListService {

    constructor(
        private http: Http,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) { }

    private GetGameResultUrl = `${this.HOST_NAME}/api/get_game_result.php`;
    private SetGameResultUrl = `${this.HOST_NAME}/api/set_game_result.php`;

    GetGameResult(): Promise< GameResult[] > {
        return this.http
            .get( this.GetGameResultUrl )
            .toPromise()
            .then( response => response.json().data as GameResult[] )
            .catch( this.handleError );
    }

    private headers = new Headers( {'Content-Type': 'application/json'} );
    private options = new RequestOptions({ headers: this.headers });

    SetGameResult( GameResultList: any[] ): Promise< GameResult[] > {
        return this.http
            .post( this.SetGameResultUrl, JSON.stringify(GameResultList), this.options )
            .toPromise()
            .then( () => GameResultList )
            .catch( error => this.handleError( error ) );
    }

    private handleError( error: any ): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
