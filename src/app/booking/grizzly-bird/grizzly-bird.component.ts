import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewportScroller } from '@angular/common';

import { BookingService } from '../../booking.service'

@Component({
  selector: 'app-grizzly-bird',
  templateUrl: './grizzly-bird.component.html',
  styleUrls: ['./grizzly-bird.component.scss']
})
export class GrizzlyBirdComponent implements OnInit {

  constructor(private bookingService: BookingService, private _snackBar: MatSnackBar, private readonly _viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    setTimeout(() =>  {
      this._viewportScroller.scrollToAnchor("gbAnchor")

    }, 5)
  }

  onSubmitReservation(resForm: NgForm){
    if (resForm.invalid){
      return
    }

    this.bookingService.createReservation(resForm, "GrizzlyBird").subscribe( (response) =>{
      this._snackBar.open('Message Sent', '', {
        duration: 5000
      })
      resForm.resetForm()
    }, (err) => {
      this._snackBar.open('An error occured while sending the message.', '', {
        duration: 5000
      })
      resForm.resetForm()
    }
      // (response) => {
      //   console.log("success?")
      // }, (err) => {
      //   console.log("error")
      // }
    );

  }

}
