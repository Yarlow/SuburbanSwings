import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SSEvent } from '../event.model'

export interface SignupDialogData {
  choice: string;
}


@Component({
  selector: 'app-event-signup',
  templateUrl: './event-signup.component.html',
  styleUrls: ['./event-signup.component.css']
})
export class EventSignupComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  availableTimes
  availableDays: string[]
  selectedDay
  availableSelectedDayTimes
  eventInfo: SSEvent
  eventID: string
  eventName: string = "Event"


  constructor(private eventsService: EventsService, public dialog: MatDialog,  public route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'teamName': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Name': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Email': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Phone': new FormControl(null, {validators: [Validators.required]}),
      // 'tMem2Name': new FormControl(null, {validators: [Validators.required]}),
      // 'tMem2Email': new FormControl(null, {validators: [Validators.required]}),
      // 'tMem2Phone': new FormControl(null, {validators: [Validators.required]}),
      'selectedDay': new FormControl(null, {validators: [Validators.required]}),
      'selectedTime': new FormControl(null, {validators: [Validators.required]})
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.eventID = paramMap.get('eventID')
      this.isLoading = true;
      this.eventsService.getEventInfo(this.eventID).then(eventData => {
        this.eventInfo = eventData
        this.eventName = this.eventInfo.name
        this.availableTimes = this.eventInfo.availableTimes
        this.availableDays = this.filterEmptyDays(this.availableTimes)
        this.isLoading = false;
        if (this.availableDays.length === 1) {
          this.form.patchValue({'selectedDay': this.availableDays[0]})
        }

        if (this.eventInfo.setupAndRules.playersPerTeam > 1) {
            this.form.addControl('tMem2Name', new FormControl(null, {validators: [Validators.required]}));
            this.form.addControl('tMem2Email', new FormControl(null, {validators: [Validators.required]}));
            this.form.addControl('tMem2Phone', new FormControl(null, {validators: [Validators.required]}));


        }
      }).catch(err => {
        console.log("Bigg error energy")
      })





    })
    // this.isLoading = true;

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
        this.availableSelectedDayTimes = this.availableTimes[this.form.value.selectedDay].sort((a, b) => {
          const a24 = this.convertTo24Hours(a);
          const b24 = this.convertTo24Hours(b);
          return a24 - b24;
        })
      }
    })
  }

  convertTo24Hours(time) {
    let removeCol = time.split(':')
    let halfOfDay = removeCol[1].substring(2);
    let hour = halfOfDay === 'am' ? parseInt(removeCol[0]) : parseInt(removeCol[0]) + 12;
    if (halfOfDay === 'pm' && parseInt(removeCol[0]) == 12) {
      hour -= 12;
    }
    // console.log(time , '->', hour * 100 + parseInt(removeCol[1]))
    return hour * 100 + parseInt(removeCol[1])
  }

  onConfirm() {
    if (this.form.invalid){
      return
    }
    const dialogRef = this.dialog.open(EventSignupConfirmDialog , {
      width: '300px',
      data: {choice: ""}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.choice === "yes"){
        this.onSignUp()
      }
    })
  }

  onSignUp() {

    let player1 = {
      name: this.form.value.tMem1Name,
      email: this.form.value.tMem1Email,
      phone: this.form.value.tMem1Phone
    }

    //fix this later idiot
    let player2 = {
      name: this.form.value.tMem2Name ? this.form.value.tMem2Name : "nullbcdumb",
      email: this.form.value.tMem2Email ? this.form.value.tMem2Email : "nullbcdumb",
      phone: this.form.value.tMem2Phone ? this.form.value.tMem2Phone : "nullbcdumb",
    }


    let team = {
      teamName: this.form.value.teamName,
      playDay: this.form.value.selectedDay,
      playTime: this.form.value.selectedTime

    }

    this.isLoading = true

    this.eventsService.createTeam(player1, player2, team, this.eventID).then(response => {
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
  selector: 'event-signup-confirm-dialog',
  templateUrl: 'event-signup-confirm-dialog.html'
})
export class EventSignupConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<EventSignupConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SignupDialogData
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
