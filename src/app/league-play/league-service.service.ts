import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeagueServiceService {

  availableTimes = {
    Wednesday: ['3:30', '5:00', '6:30', '8:00'],
    Thursday: ['3:30', '5:00', '6:30', '8:00'],
    Sunday: ['12:30', '2:00', '3:30', '5:00', '6:30', '8:00']
  }

  constructor() { }


  getTimes() {
    return this.availableTimes
  }

}
