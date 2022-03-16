import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeagueService } from '../league.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  choice: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  availableTimes
  availableDays: string[]
  selectedDay
  availableSelectedDayTimes
  seasonInfo

  constructor(private leagueService: LeagueService, public dialog: MatDialog, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'teamName': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Name': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Email': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Phone': new FormControl(null, {validators: [Validators.required]}),
      'tMem2Name': new FormControl(null, {validators: [Validators.required]}),
      'tMem2Email': new FormControl(null, {validators: [Validators.required]}),
      'tMem2Phone': new FormControl(null, {validators: [Validators.required]}),
      'selectedDay': new FormControl(null, {validators: [Validators.required]}),
      'selectedTime': new FormControl(null, {validators: [Validators.required]})
    })
    this.isLoading = true;
    this.leagueService.getSeasonInfo().then(seasonData => {
      this.seasonInfo = seasonData
      this.availableTimes = this.seasonInfo.availableTimes
      this.availableDays = this.filterEmptyDays(this.availableTimes)
      this.isLoading = false;
      // console.log(this.availableTimes)
    })
    // console.log("available days")
    // console.log(this.availableDays)
    this.onChanges()
  }

  filterEmptyDays(times){
    let available: string[] = []
    for (let day of Object.keys(times)) {
      if (this.availableTimes[day].length > 0) {
        available.push(day)
      }
    }
    return available
    // Object.keys(this.availableTimes)
  }

  onChanges() {

    this.form.valueChanges.subscribe(x => {
      if (this.form.value.selectedDay){
        this.availableSelectedDayTimes = this.availableTimes[this.form.value.selectedDay]
      }
    })
  }

  onConfirm() {
    if (this.form.invalid){
      return
    }
    const dialogRef = this.dialog.open(LeagueSignupConfirmDialog , {
      width: '300px',
      data: {choice: ""}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.choice === "yes"){
        this.onSignUp()
      }
      // console.log("Dialog result: ")
      // console.log(result)
    })
  }

  onSignUp() {
    // if (this.form.invalid){
    //   return
    // }

    let player1 = {
      name: this.form.value.tMem1Name,
      email: this.form.value.tMem1Email,
      phone: this.form.value.tMem1Phone
    }

    let player2 = {
      name: this.form.value.tMem2Name,
      email: this.form.value.tMem2Email,
      phone: this.form.value.tMem2Phone
    }

    let team = {
      teamName: this.form.value.teamName,
      playDay: this.form.value.selectedDay,
      playTime: this.form.value.selectedTime

    }

    // console.log(player1)
    // console.log(player2)
    // console.log(team)
    this.isLoading = true
    this.leagueService.createTeam(player1, player2, team).then(response => {
      this.router.navigate(['/']);

    }).catch(err => {
      this.isLoading = false;
      this._snackBar.open('An error occured. Please try again.', '', {
        duration: 10000
      })
      console.log("err inside signup")
    })
  }

}

@Component({
  selector: 'league-signup-confirm-dialog',
  templateUrl: 'league-signup-confirm-dialog.html'
})
export class LeagueSignupConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<LeagueSignupConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onYesClick(): void {
    this.dialogRef.close({
      choice: "yes"
    })
  }

  onNoClick(): void {
    this.dialogRef.close({
      choice: "no"
    });
  }
}
