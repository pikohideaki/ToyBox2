import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';

import { ResetButtonComponent } from '../reset-button/reset-button.component';


@Component({
  providers: [ResetButtonComponent],
  selector: 'my-data-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.css']
})
export class TableBodyComponent implements OnInit, OnChanges {

    @Input() data: any[] = [];
    
    @Input()  filteredData: any[] = [];
    @Output() filteredDataChange = new EventEmitter<void>();

    @Input()
    columnSettings: {
            name        : string,
            align       : string,
            manip       : string,
            manipState  : any,
            button      : boolean,
            headerTitle : string,
        }[] = [];

    selectorOptions: any = {};


    @Output() onClick = new EventEmitter<number>();


    constructor(
        private mylib: MyLibraryService,
        private resetButton: ResetButtonComponent
    ) { }

    ngOnInit() {
    }


    ngOnChanges( changes: SimpleChanges ) {
        // console.log( changes );
        if ( changes.data != undefined ) {  // at http-get done
            this.updateView();
        }
    }


    updateView() {
        this.filteredData = this.data.filter( x => this.filterFunction(x) );
        this.selectorOptions = this.generateSelectorOptions( this.filteredData );
        // this.selectedPageIndex = 0;
        this.filteredDataChange.emit();
    }


    reset( name?: string ): void {
        this.resetButton.resetSelector( this.columnSettings, name );
        this.updateView();
    }


    filterFunction( data: any ): boolean {
        let validSettings = this.columnSettings.filter( column => column.manipState != undefined );

        for ( let column of validSettings ) switch ( column.manip ) {
            case 'filterBySelecter' :
                if ( data[ column.name ] != column.manipState ) return false;

            case 'incrementalSearch' :
                let regexp = new RegExp( column.manipState, "gi" );
                if ( !regexp.test( data[ column.name ] ) ) return false;

            default :
                break;
        }
        return true;
    }


    /* データから指定列を取り出す */
    getColumn( data: any[], name: string ): any[] {
        return data.map( e => e[ name ] );
    }

    generateSelectorOptions( data: any[] ): any {
        let selectorOptions = {};
        for ( let e of this.columnSettings ) {
        if ( e.manip != 'filterBySelecter' ) continue;
        selectorOptions[ e.name ]
        = this.mylib.uniq( this.getColumn( data, e.name ) );
        }
        return selectorOptions;
    }


    buttonClicked( row: number ) {
        this.onClick.emit( row );
    }

}
