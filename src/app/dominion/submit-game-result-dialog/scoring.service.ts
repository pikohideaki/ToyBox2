import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ScoringService {

    constructor(
        private http: Http,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) { }

    private GetScoringUrl = `${this.HOST_NAME}/api/GetScoringList.php`;
    private SetScoringUrl = `${this.HOST_NAME}/api/SetScoringList.php`;

    GetScoringList(): Promise<number[][]> {
        return this.http
                   .get( this.GetScoringUrl )
                   .toPromise()
                   .then( response => response.json().data )
                //    .then( data => {
                //        let scoringMap = new Map();
                //        for ( let i = 0; i < data.length; ++i ) {
                //            for ( let j = 0; j < data[i].length; ++j ) {
                //                scoringMap.set( { playerNum : i, rank : j }, data[i][j] );
                //             //    scoringMap.set( `${i},${j}`, data[i][j] );
                //                console.log(scoringMap.has({ playerNum : i, rank : j }));
                //            }
                //        }
                //        return scoringMap;
                //    })
                   .catch( this.handleError );
    }

    private headers = new Headers( {'Content-Type': 'application/json'} );
    private options = new RequestOptions({ headers: this.headers });

    SetScoringList( ScoringList: any[] ): Promise<any> {
        return this.http
                   .post( this.SetScoringUrl, JSON.stringify( ScoringList ), this.options )
                   .toPromise()
                   .then( () => ScoringList )
                   .catch( error => this.handleError( error ) );
    }

    private handleError( error: any ): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
