import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-submit-game-result-dialog',
  templateUrl: './submit-game-result-dialog.component.html',
  styleUrls: ['./submit-game-result-dialog.component.css']
})
export class SubmitGameResultDialogComponent implements OnInit {
    gameResult;

    constructor(
        public dialogRef: MdDialogRef<SubmitGameResultDialogComponent>,
    ) {}

    ngOnInit() {
    }

}
