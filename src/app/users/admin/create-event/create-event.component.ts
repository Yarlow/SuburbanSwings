import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../../events/events.service';
import { LocationService } from '../../../events/location.service';
import { SSLocation } from '../../../events/location.model';
import { mimeType } from "./mime-type.validator";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SSEvent } from 'src/app/events/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface EventPreviewDialogData {
  choice: string;
  event: SSEvent;
}


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  form: FormGroup;
  defaultStartDate: Date = null
  defaultEndDate: Date = null
  eventTypes = ['Tournament', 'Season']
  imagePreview: string;
  // locations = ['Nocterra', 'HeartState']

  showSunday = false;
  showMonday = false;
  showTuesday = false;
  showWednesday = false;
  showThursday = false;
  showFriday = false;
  showSaturday = false;

  availableTimes = [
    '10:00am',
    '10:30am',
    '11:00am',
    '11:30am',
    '12:00pm',
    '12:30pm',
    '1:00pm',
    '1:30pm',
    '2:00pm',
    '2:30pm',
    '3:00pm',
    '3:30pm',
    '4:00pm',
    '4:30pm',
    '5:00pm',
    '5:30pm',
    '6:00pm',
    '6:30pm',
    '7:00pm',
    '7:30pm',
    '8:00pm',
    '8:30pm',
    '9:00pm',
    '9:30pm',
    '10:00pm',
    '10:30pm',
    '11:00pm',
    '11:30pm'
  ]

  locations: SSLocation[] = []

  constructor(private eventsService: EventsService, private locationsService: LocationService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'eventName': new FormControl(null, {validators: [Validators.required]}),
      'selectedLocation' : new FormControl(null, {validators: [Validators.required]}),
      'startDate': new FormControl(this.defaultStartDate, {validators: [Validators.required]}),
      'endDate': new FormControl(this.defaultEndDate, {validators: [Validators.required]}),
      'eventType': new FormControl(null, {validators: [Validators.required]}),
      'sundayTimes': new FormControl([], {}),
      'mondayTimes': new FormControl([], {}),
      'tuesdayTimes': new FormControl([], {}),
      'wednesdayTimes': new FormControl([], {}),
      'thursdayTimes': new FormControl([], {}),
      'fridayTimes': new FormControl([], {}),
      'saturdayTimes': new FormControl([], {}),
      'eventPrice': new FormControl(null, {validators: [Validators.required]}),
      'playersPerTeam': new FormControl(null, {validators: [Validators.required]}),
      'holesPerRound': new FormControl(null, {validators: [Validators.required]}),
      // 'image': new FormControl(null, {
      //   validators: [Validators.required],
      //   asyncValidators: [mimeType]
      // }),
      'imageLink' : new FormControl(null, {validators: [Validators.required]}),
      'summaryText': new FormControl(null, {validators: [Validators.required]})
    })

    this.locationsService.getLocations().subscribe(response => {
      this.locations = response.locations;

      console.log(this.locations)


    })

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.form.value.selectedLocation)
    if (this.form.invalid){
      console.log("invalid?")
      return
    }
    let maxTeams = 0;
    if (this.showSunday) {
      maxTeams += this.form.value.sundayTimes.length
    }
    if (this.showMonday) {
      maxTeams += this.form.value.mondayTimes.length
    }
    if (this.showTuesday) {
      maxTeams += this.form.value.tuesdayTimes.length
    }
    if (this.showWednesday) {
      maxTeams += this.form.value.wednesdayTimes.length
    }
    if (this.showThursday) {
      maxTeams += this.form.value.thursdayTimes.length
    }
    if (this.showFriday) {
      maxTeams += this.form.value.fridayTimes.length
    }
    if (this.showSaturday) {
      maxTeams += this.form.value.saturdayTimes.length
    }

    let setupAndRules = {
      holesPerRound: this.form.value.holesPerRound,
      playersPerTeam: this.form.value.playersPerTeam,
      maxTeams
    }
    console.log(this.form.value.sundayTimes)
    let availableTimes = {
      Sunday: this.showSunday ? this.form.value.sundayTimes : [],
      Monday: this.showMonday ? this.form.value.mondayTimes : [],
      Tuesday: this.showTuesday ? this.form.value.tuesdayTimes : [],
      Wednesday: this.showWednesday ? this.form.value.wednesdayTimes : [],
      Thursday: this.showThursday ? this.form.value.thursdayTimes : [],
      Friday: this.showFriday ? this.form.value.fridayTimes : [],
      Saturday: this.showSaturday ? this.form.value.saturdayTimes : []
    }
    let ssEvent = {
      name: this.form.value.eventName,
      location: this.form.value.selectedLocation,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      price: this.form.value.eventPrice,
      summaryText: this.form.value.summaryText,
      image: this.form.value.imageLink,
      availableTimes,
      setupAndRules,
      eventType: this.form.value.eventType
    }

    const dialogRef = this.dialog.open(EventCreatePreviewDialog , {
      width: '400px',
      data: {
        choice: "",
        event: {
          name: this.form.value.eventName,
          location: this.form.value.selectedLocation,
          availableTimes,
          setupAndRules,
          // image: this.imagePreview,
          image: this.form.value.imageLink,
          startDate: this.form.value.startDate,
          endDate: this.form.value.endDate,
          price: this.form.value.eventPrice,
          summaryText: this.form.value.summaryText,
          eventType: this.form.value.eventType
        }
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.choice === "yes"){
        this.createEvent(ssEvent)
      }
    })
    // this.eventsService.createEvent(ssEvent)
  }

  createEvent(ssEvent) {
    this.eventsService.createEvent(ssEvent);
  }

}


@Component({
  selector: 'event-create-preview-dialog',
  templateUrl: 'event-create-preview-dialog.html',
  styleUrls: ['./create-event.component.css']
})
export class EventCreatePreviewDialog {
  constructor(
    public dialogRef: MatDialogRef<EventCreatePreviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EventPreviewDialogData,
    private _snackBar: MatSnackBar
  ) {}

  eventElement: SSEvent
  availableSlots: number = 0

  ngOnInit() {
    this.eventElement = this.data.event
    console.log(this.eventElement)
    for (let day of Object.keys(this.eventElement.availableTimes)) {
      console.log(this.eventElement.availableTimes[day].length)
      this.availableSlots += this.eventElement.availableTimes[day].length
    }
  }

  matSnack() {
    this._snackBar.open('Please Confirm Or Deny the event', '', {
      duration: 10000
    })
  }

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
