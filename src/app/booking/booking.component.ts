import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BookingService } from '../booking.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  onSubmitReservation(resForm: NgForm){
    if (resForm.invalid){
      return
    }

    this.bookingService.createReservation(resForm);

  }

}
