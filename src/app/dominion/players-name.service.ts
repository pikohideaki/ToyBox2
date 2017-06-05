import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';




@Injectable()
export class PlayersNameListService {

  constructor(
    private http: Http,
    @Inject('HOST_NAME') private HOST_NAME: string
  ) { }

  private Url = `${this.HOST_NAME}/api/PlayersNameList.php`;

  GetPlayersNameList(): Promise< { name: string, name_yomi: string }[] > {
    return this.http
      .get( this.Url )
      .toPromise()
      .then( response => response.json().data as { name: string, name_yomi: string }[] )
      .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }

}
