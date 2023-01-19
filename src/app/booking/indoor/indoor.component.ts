import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookingService } from '../../booking.service'
@Component({
  selector: 'app-indoor',
  templateUrl: './indoor.component.html',
  styleUrls: ['./indoor.component.scss']
})
export class IndoorComponent implements OnInit {

  constructor(private bookingService: BookingService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmitReservation(resForm: NgForm){
    if (resForm.invalid){
      return
    }

    this.bookingService.createReservation(resForm, "Indoor").subscribe( (response) =>{
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
