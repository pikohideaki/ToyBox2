import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';


@Component({
  selector: 'app-dominion',
  templateUrl: './dominion.component.html',
  styleUrls: ['./dominion.component.css']
})
export class DominionComponent implements OnInit {

    dominionApps: {address: string, title: string, subtitle: string}[] = [
        { address: "/dominion/randomizer", title: "Randomizer"      , subtitle: "サプライ生成＆ゲーム結果追加", },
        { address: "/dominion/gameresult", title: "Game Result List", subtitle: "成績表", },
        { address: "/dominion/players"   , title: "Players"         , subtitle: "プレイヤー一覧", },
        { address: "/dominion/cardlist"  , title: "Card List"       , subtitle: "カード一覧表", },
        { address: "/dominion/rulebooks" , title: "RuleBooks"       , subtitle: "Dominionのルールブック(PDF)", },
    ]

  constructor(
    // private location: Location
  ) { }

  ngOnInit() {
  }


}
