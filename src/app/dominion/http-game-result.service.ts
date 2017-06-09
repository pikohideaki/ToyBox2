import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { MyLibraryService } from '../my-library.service';
import { GameResult } from './game-result';
import { ScoringService } from './http-scoring.service';


@Injectable()
export class GameResultListService {

    constructor(
        private http: Http,
        private mylib: MyLibraryService,
        private httpScoringService: ScoringService,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) { }

    private GetGameResultListUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=GameResultList.json`;
    private SetGameResultListUrl = `${this.HOST_NAME}/api/SetJsonData.php?targetFileName=GameResultList.json`;

    GetGameResultList(): Promise< GameResult[] > {
        let result: GameResult[] = [];
        return Promise.all( [
            this.httpScoringService.GetScoringList(),
            this.http
                   .get( this.GetGameResultListUrl )
                   .toPromise()
                   .then( response => response.json().data as GameResult[] )
        ])
        .then( data => {
            let scoreTable = data[0];
            let GameResultListObj = data[1];
            GameResultListObj.forEach( grObj => result.push( new GameResult( grObj ) ) );
            let no = 1;
            result.forEach( gr => { gr.setScores( scoreTable ); gr.no = no++; } );
            console.log( "GetGameResultList Done." );
            return result;
        })
        .catch( this.handleError );
    }

    private headers = new Headers( {'Content-Type': 'application/json'} );
    private options = new RequestOptions({ headers: this.headers });

    SetGameResultList( GameResultList: any[] ): Promise< GameResult[] > {
        GameResultList.forEach( gr => {
            gr.no = undefined;
            gr.players.forEach( pl => {
                pl.rank = undefined;
                pl.score = undefined;
            });
        });
        return this.http
                   .post( this.SetGameResultListUrl, JSON.stringify( GameResultList ), this.options )
                   .toPromise()
                   .then( () => {
                       console.log( "SetGameResultList Done." );
                       return GameResultList;
                    } )
                   .catch( error => this.handleError( error ) );
    }

    private handleError( error: any ): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
