import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ScoringService {

    constructor(
        private http: Http,
        @Inject('HOST_NAME') private HOST_NAME: string
    ) { }

    private GetScoringUrl = `${this.HOST_NAME}/api/GetJsonData.php?targetFileName=ScoringList.json`;
    private SetScoringUrl = `${this.HOST_NAME}/api/SetJsonData.php?targetFileName=ScoringList.json`;

    GetScoringList(): Promise<number[][]> {
        return this.http
                   .get( this.GetScoringUrl )
                   .toPromise()
                   .then( response => {
                       console.log( "GetScoringList Done." );
                       return response.json().data;
                    } )
                   .catch( this.handleError );
    }

    private headers = new Headers( {'Content-Type': 'application/json'} );
    private options = new RequestOptions({ headers: this.headers });

    SetScoringList( ScoringList: any[] ): Promise<any> {
        return this.http
                   .post( this.SetScoringUrl, JSON.stringify( ScoringList ), this.options )
                   .toPromise()
                   .then( () => {
                       console.log( "SetScoringList Done." );
                       return ScoringList;
                    } )
                   .catch( error => this.handleError( error ) );
    }

    private handleError( error: any ): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject( error.message || error );
    }

}
