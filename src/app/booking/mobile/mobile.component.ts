import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookingService } from '../../booking.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  constructor(private readonly _viewportScroller: ViewportScroller, private bookingService: BookingService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    setTimeout(() =>  {
      this._viewportScroller.scrollToAnchor("mobileAnchor")

    }, 5)
  }

  onSubmitReservation(resForm: NgForm){
    if (resForm.invalid){
      return
    }

    this.bookingService.createReservation(resForm, "Mobile").subscribe( (response) =>{
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
