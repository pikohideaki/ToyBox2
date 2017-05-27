import { Injectable, Inject } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';




@Injectable()
export class GetSetListService {

  constructor(
    private http: Http,
    @Inject('HOST_NAME') private HOST_NAME: string
  ) { }

  private SetListUrl = `${this.HOST_NAME}/api/set_list.php`;

  GetSetList(): Promise< string[] > {
    return this.http
      .get( this.SetListUrl )
      .toPromise()
      .then( response => response.json().data as string[] )
      .catch( this.handleError );
  }

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }

}
