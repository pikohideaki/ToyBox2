import { Component, OnInit, Injectable, Inject } from '@angular/core';
// import { Location } from '@angular/common';
import { HttpModule, Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CardInfo } from "../../card-info";


@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {

  CardInfoList: CardInfo[] = [];

  constructor(
    private http: Http,
    @Inject('HOST_NAME') private HOST_NAME: string
  ) {}

  ngOnInit() {
    this.GetCardInfo()
      .then( CardInfoArray => this.CardInfoList = CardInfoArray );
  }


  private CardInfoUrl = `${this.HOST_NAME}/api/cardinfo.php`;
  // private CardInfoUrl = './api/cardinfo.php';

  private handleError( error: any ): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject( error.message || error );
  }


  // get CardInfo
  GetCardInfo(): Promise< CardInfo[] > {
  // GetCardInfo() {
    console.log( this.CardInfoUrl );
    return this.http
      .get( this.CardInfoUrl )
      .toPromise()
      // .then( response => console.log( response.json().data ) );
      .then( response => response.json().data as CardInfo[] )
      .catch( this.handleError );
  }



  // add CardInfo
  // EditCardInfo(): void {
  //   let cardinfo = new CardInfo( 14, 'new card' );
  //   this.CardInfoList.push( cardinfo );
  //   this.AddCardInfo( cardinfo );
  // }


  private headers = new Headers({'Content-Type': 'application/json'});



  // AddCardInfo( cardinfo: CardInfo ): Promise<CardInfo> {
  //   const url = `${this.CardInfoUrl}/${cardinfo.id}`;

  //   console.log( JSON.stringify( cardinfo ), url );
  //   return this.http
  //     .put( url, JSON.stringify( cardinfo ), { headers: this.headers } )
  //     .toPromise()
  //     .then( () => cardinfo )
  //     .catch( this.handleError );
  // }


  // update( cardinfo: CardInfo ): Promise<CardInfo> {
  //   const url = this.CardInfoUrl;
  //   console.log( cardinfo, url );
  //   return this.http
  //     .put( url, JSON.stringify( this.CardInfoList ), { headers: this.headers } )
  //     .toPromise()
  //     .then( () => cardinfo )
  //     .catch( this.handleError );
  // }


  // GetCardlist(): void {
  //   let httpGetObservable = this.http.get( this.CardlistUrl )
  //       .toPromise()
  //       .then(response => response.json().data as Hero[])
  //       .catch(this.handleError);

    // httpGetObservable.subscribe(
    //   res   => { this.CardlistTSV = res.text(); },
    //   error => { console.error( `${error.status} : ${error.statusText}` ); },
    // )
  // }
}
