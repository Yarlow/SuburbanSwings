import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { BookingService } from '../booking.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  selectedBooking: string = "";

  constructor(private bookingService: BookingService, private _snackBar: MatSnackBar,  private router: Router, public route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.selectedBooking = paramMap.get('bookingType')
    })
  }

  onBookingSelect (bookingType: string) {
    this.router.navigate(['Booking', bookingType])
  }

  onSubmitReservation(resForm: NgForm){
    if (resForm.invalid){
      return
    }

    this.bookingService.createReservation(resForm, "Old Booking").subscribe( (response) =>{
      this._snackBar.open('Message Sent', '', {
        duration: 5000
      })
      resForm.resetForm()
    }, (err) => {
      this._snackBar.open('Message Sent', '', {
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
