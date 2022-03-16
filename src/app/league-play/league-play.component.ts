import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-league-play',
  templateUrl: './league-play.component.html',
  styleUrls: ['./league-play.component.css']
})
export class LeaguePlayComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSignUp(): void {
    let dialogRef = this.dialog.open(SignupComponent)
  }
}
