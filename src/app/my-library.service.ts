import { Injectable } from '@angular/core';

@Injectable()
export class MyLibraryService {

  constructor() { }

  RandInt( Min: number, Max: number ): number {
    return Min + Math.floor( Math.random() * ( Max - Min + 1 ) );
  }

  isEmpty( ar: any[] ): boolean {
    return ar.length === 0;
  }

  back<T>( ar: Array<T> ): T {
    return ar[ ar.length - 1 ];
  };


  removeAt<T>( ar: Array<T>, index: number ): Array<T> {
    return ar.splice( index, 1 );
  };

  removeValue<T>( ar: Array<T>, target: T ): Array<T> {
    return ar.filter( e => e != target );
  };

  append( ar1: any[], ar2: any[] ): any[] {
    return [].concat( ar1, ar2 );
  }



  // let a = [ 1,2,3,[1,2,3],5 ];
  // let b = this.mylib.makeShallowCopy(a);
  // a[2] = 999;
  // a[3][1] = 9999;
  // console.log( a,b );
  copy<T>( ar: Array<T> ): Array<T> {
    return [].concat( ar );
  }


  shallowCopy( obj, asArray?: boolean ) {
    if ( asArray ) return Object.assign([], obj);
    return Object.assign({}, obj);
  }

  filterRemove<T>( array: Array<T>, f: (T) => boolean ): [ Array<T>, Array<T> ] {
    let others = array.filter( (e) => !f(e) );
    return [ array.filter(f), others ];
  };

  // copy and return unique array
  // 要素の値を定義する関数（この値の同値性でuniqをかける
  uniq<T>( ar: Array<T>, f: (T) => any = ( (e) => e ) ) {
    return ar.map( (e) => [ e, f(e) ] )
        .filter( (val, index, array ) => (array.map( a => a[1] ).indexOf( val[1] ) === index) )
        .map( a => a[0] );
  };

  sortNumeric( array: string[] ): string[] {
    return array.sort( (a,b) => ( parseFloat(a) - parseFloat(b) ) );
  };


  shuffle( array: any[] ): any[] {
    return array
        .map( (e) => [e, Math.random()] )
        .sort( (x, y) => x[1] - y[1] )
        .map( (pair) => pair[0] );
  }

  permutation( n: number ): number[] { 
    let ar = new Array<number>(n);
    for ( let i = 0; i < n; ++i ) { ar[i] = i; }
    return this.shuffle( ar );
  }


   sleep( sec: number ): Promise<any> {
    return new Promise( resolve => setTimeout( resolve, sec * 1000 ) );
  }


}



// // let ar = [3,6,7,9,1,2,4,5];
// // console.log( NotUsedNumber([], 2) ); -> 8
// NotUsedNumber( NumberArray: number[], start_number: number ): number {
//   let sorted: number[] = NumberArray.sort();
//   while ( sorted[0] < start_number ) sorted.shift();
//   if ( sorted.length === 0 ) return start_number;
//   for ( let i = 0; i < sorted.length; ++i ) {
//     if ( Number( sorted[i] ) !== start_number + i ) return start_number + i;
//   }
//   return start_number + sorted.length;
// }

