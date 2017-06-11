import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'local-game-groups',
    templateUrl: './local-game-groups.component.html',
    styleUrls: ['./local-game-groups.component.css']
})
export class LocalGameGroupsComponent implements OnInit {

    gameGroups = [
        { name: "group1", password: "kusonemi" }
    ];

    newGroupName: string = "";
    newGroupPassword: string = "";


    constructor() { }

    ngOnInit() {
        this.newGroupName = `group ${this.gameGroups.length + 1}`;
    }


    group1Clicked() {
        console.log("group1Clicked")
    }

    addNewGroup() {
        this.gameGroups.unshift( { name: this.newGroupName, password: this.newGroupPassword } );
    }

}
