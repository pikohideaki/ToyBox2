import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ResetButtonComponent } from '../reset-button/reset-button.component';

import { CardListPipe } from '../../dominion/cardlist/card-list.pipe';


@Component({
  providers: [ResetButtonComponent],
  selector: 'noshiro-data-table--table-header',
  templateUrl: './table-header.component.html',
  styleUrls: [
    '../noshiro-data-table.component.css',
    './table-header.component.css'
  ]
})
export class TableHeaderComponent implements OnInit {

  @Input()  columnSettings: any = {};
  @Output() columnSettingsChange = new EventEmitter();

  @Input() selectorOptions: any = {};

  @Output() onChange = new EventEmitter<void>();

  constructor(
    private resetButton: ResetButtonComponent
  ) {
  }

  ngOnInit() {
  }

  resetSelection( columnName?: string ): void {
    this.resetButton.resetSelector( this.columnSettings, columnName );
    this.updateView();
    this.columnSettingsChange.emit();
  }

  updateView() {
    this.onChange.emit();
  }
}
