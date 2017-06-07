import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    Apps: {address: string, title: string, subtitle: string}[] = [
        {
            address: "/dominion",
            title: "Dominion Apps",
            subtitle: "サプライ生成＆ゲーム結果追加，成績表，プレイヤー一覧，カード一覧表，ルールブック",
        },
    ]

  constructor() { }

  ngOnInit() {
  }

}
