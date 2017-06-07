import { Component, OnInit } from '@angular/core';

import { MyLibraryService } from '../../my-library.service';
import { MyDataTableComponent } from '../../my-data-table/my-data-table.component';
import { PlayersNameListService } from '../players-name.service';


@Component({
    providers: [PlayersNameListService],
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: [
        '../../my-data-table/my-data-table.component.css',
        './players.component.css'
    ]
})
export class PlayersComponent implements OnInit {

  PlayersNameList: { name: string, name_yomi: string }[] = [];
  httpGetDone: boolean = false;


  // pagenation settings
  itemsPerPageOptions: number[] = [ 10,20,30 ];
  itemsPerPageDefault: number = 20;


  columnSettings = [
    { name: 'name'     , align: 'l', manip: 'autoComplete', button: false, headerTitle: '名前' },
    { name: 'name_yomi', align: 'l', manip: 'none', button: false, headerTitle: '読み' },
  ];



  constructor(
    private mylib: MyLibraryService,
    private httpPlayersNameListService: PlayersNameListService,
  ) { }

  ngOnInit() {
      this.httpPlayersNameListService.GetPlayersNameList()
      .then( data => {
          this.PlayersNameList = data;
          this.httpGetDone = true;
       } );
  }

}
