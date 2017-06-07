import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { MyLibraryService } from '../my-library.service';
import { GameResult } from './game-result';


@Injectable()
export class GameResultListService {

    constructor(
        private http: Http,
        private mylib: MyLibraryService,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) { }

    private GetGameResultListUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=GameResultList.json`;
    private SetGameResultListUrl = `${this.HOST_NAME}/api/SetJsonData.php?targetFileName=GameResultList.json`;

    GetGameResultList(): Promise< GameResult[] > {
        return this.http
                   .get( this.GetGameResultListUrl )
                   .toPromise()
                   .then( response => response.json().data as GameResult[] )
                   .then( listObj => {
                       let result: GameResult[] = [];
                       listObj.forEach( grObj => result.push( new GameResult( grObj ) ) );
                       console.log( "GetGameResult Done." );
                       return result;
                   } )
                   .catch( this.handleError );
    }

    private headers = new Headers( {'Content-Type': 'application/json'} );
    private options = new RequestOptions({ headers: this.headers });

    SetGameResultList( GameResultList: any[] ): Promise< GameResult[] > {
        return this.http
                   .post( this.SetGameResultListUrl, JSON.stringify( GameResultList ), this.options )
                   .toPromise()
                   .then( () => {
                       console.log( "SetGameResult Done." );
                       return GameResultList;
                    } )
                   .catch( error => this.handleError( error ) );
    }

    private handleError( error: any ): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
