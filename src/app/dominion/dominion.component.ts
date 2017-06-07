import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';


@Component({
  selector: 'app-dominion',
  templateUrl: './dominion.component.html',
  styleUrls: ['./dominion.component.css']
})
export class DominionComponent implements OnInit {

    dominionApps: {address: string, title: string, subtitle: string, inService: boolean}[] = [
        { address: "/dominion/randomizer", inService: true , title: "Randomizer"      , subtitle: "サプライ生成＆ゲーム結果追加", },
        { address: "/dominion/gameresult", inService: true , title: "Game Result List", subtitle: "成績表", },
        { address: "/dominion"           , inService: false, title: "Scoring"         , subtitle: "成績表でのスコアのつけ方を設定", },
        { address: "/dominion/players"   , inService: true , title: "Players"         , subtitle: "プレイヤー一覧", },
        { address: "/dominion/cardlist"  , inService: true , title: "Card List"       , subtitle: "カード一覧表", },
        { address: "/dominion/rulebooks" , inService: true , title: "RuleBooks"       , subtitle: "Dominionのルールブック(PDF)", },
        { address: "/dominion"           , inService: false, title: "Online"          , subtitle: "Dominion オンライン対戦", },
    ]

  constructor(
    // private location: Location
  ) { }

  ngOnInit() {
  }


}
