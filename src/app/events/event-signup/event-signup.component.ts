import { UserService } from './../../users/user.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SSEvent } from '../event.model'

import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent
} from '@stripe/stripe-js';

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
  paymentIntentLoading: boolean = false;
  availableTimes
  availableDays: string[]
  selectedDay
  availableSelectedDayTimes
  eventInfo: SSEvent
  eventID: string
  eventName: string = "Event"
  private stripeCompleted: boolean = false;
  paymentIntent: PaymentIntent;
  teamStep: boolean = true;
  paymentStep: boolean = false;
  expireTime: Date;


  constructor(
    private eventsService: EventsService, 
    public dialog: MatDialog,  
    public route: ActivatedRoute, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private stripeService: StripeService
    ) { }


  ngOnInit(): void {
    this.userService.getIsAuth();

    this.form = new FormGroup({
      'teamName': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Name': new FormControl(null, {validators: [Validators.required]}),
      'tMem1Email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
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
            this.form.addControl('tMem2Email', new FormControl(null, {validators: [Validators.required, Validators.email]}));
            this.form.addControl('tMem2Phone', new FormControl(null, {validators: [Validators.required]}));
        }


        // START EMBEDED STRIPE THINGS
        // this.paymentIntentLoading = true;
        // this.eventsService.createPaymentIntent(eventData)
        //   .subscribe(pi => {
        //     console.log(pi);
        //     this.paymentIntent = pi;
        //     this.paymentIntentLoading = false;
        //     this.elementsOptions.clientSecret = pi.client_secret;
        // });
        // END EMBEDED STRIPE THINGS

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
    if (this.form.invalid){
      this._snackBar.open("Please Complete all team and event information", "X" ,{
        duration: 5000
      });
      return
    }

    // if (!this.stripeCompleted) {
    //   this._snackBar.open("Please Complete all payment information", "X",{
    //     duration: 5000
    //   });
    //   return
    // }


    let players = []
    let player1 = {
      name: this.form.value.tMem1Name,
      email: this.form.value.tMem1Email,
      phone: this.form.value.tMem1Phone
    }

    players.push(player1)

    //fix this later idiot
    if (this.eventInfo.setupAndRules.playersPerTeam > 1) {
      let player2 = {
        name: this.form.value.tMem2Name ? this.form.value.tMem2Name : "nullbcdumb",
        email: this.form.value.tMem2Email ? this.form.value.tMem2Email : "nullbcdumb",
        phone: this.form.value.tMem2Phone ? this.form.value.tMem2Phone : "nullbcdumb",
      }
      players.push(player2)
    }


    let team = {
      teamName: this.form.value.teamName,
      playDay: this.form.value.selectedDay,
      playTime: this.form.value.selectedTime

    }

    // this.isLoading = true
    var paymentElement = this.paymentElement;
    var paymentService = this.stripeService;
    this.teamStep = false;
    this.eventsService.createTeam(players, team, this.eventID, this.paymentIntent).then(response => {
      // this.router.navigate(['/']);
      // this.pay(paymentElement, paymentService);
      this.expireTime = new Date(response.expireTime);
      this.paymentStep = true;
      this.disableForm();
      this.paymentIntentLoading = true;
      this.eventsService.createPaymentIntent(this.eventInfo, response.team._id)
        .subscribe(pi => {
          console.log(pi);
          this.paymentIntent = pi;
          this.paymentIntentLoading = false;
          this.elementsOptions.clientSecret = pi.client_secret;
      });
    }).catch(err => {
      this.isLoading = false;
      this._snackBar.open(err.error.message, 'X', {
        duration: 10000
      })
    })
  }

  disableForm() {
    this.form.get('teamName').disable();
    this.form.get('tMem1Name').disable();
    this.form.get('tMem1Email').disable();
    this.form.get('tMem1Phone').disable();
    if (this.form.get('tMem2Name')) {
      this.form.get('tMem2Name').disable();
      this.form.get('tMem2Email').disable();
      this.form.get('tMem2Phone').disable();
    }
    this.form.get('selectedDay').disable();
    this.form.get('selectedTime').disable();


  }

  // START EMBEDED STRIPE THINGS
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  paying = false;
  pay(paymentElement,stripeService ) {
    if (true) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.form.value.tMem1Name,
              email: this.form.value.tMem1Email,
              address: {
                line1: "",
                postal_code: "",
                city: "",
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // alert({ success: true });
            this._snackBar.open("Successfully Signed Up! Watch your email for more information", "X" ,{
              duration: 5000
            });
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      // console.log(this.paymentElementForm);
    }
  }

  formChange(event) {
    if (event.complete) {
      console.log("complete");
      this.stripeCompleted = true;
    } else {
      console.log(event.error);
      this.stripeCompleted = false;
    }
  }

  // private createPaymentIntent(amount: number): Observable<PaymentIntent> {
  //   // return eventsService.createPaymentIntent
    
  // }

  // END EMBEDED STRIPE THINGS


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
