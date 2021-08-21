import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { NgForm } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class BookingService {

  constructor(private http: HttpClient){}

  createReservation(resForm: NgForm) {
    const reservationInfo = {
      name: resForm.value.name,
      contactInfo: resForm.value.contactInfo,
      address: resForm.value.address,
      date: resForm.value.date,
      reservationLength: resForm.value.reservationLength,
      additionalInfo: resForm.value.additionalInfo

    }
    return this.http.post<{message: string}>('http://localhost:5000/reservation', reservationInfo)

  }

}
