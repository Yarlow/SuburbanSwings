import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-teams',
  templateUrl: './user-teams.component.html',
  styleUrls: ['./user-teams.component.scss']
})
export class UserTeamsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('teams loaded')
  }

}
