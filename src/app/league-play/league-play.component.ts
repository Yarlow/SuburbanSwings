import { Component, OnInit } from '@angular/core';

import { faBong } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-league-play',
  templateUrl: './league-play.component.html',
  styleUrls: ['./league-play.component.css']
})
export class LeaguePlayComponent implements OnInit {
  faBong = faBong
  
  constructor() { }

  ngOnInit(): void {
  }

}
