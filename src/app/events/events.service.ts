import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SSEvent } from './event.model'
import { SSLocation } from './location.model'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: SSEvent[] = [
    {
      _id: "61ea22c77deb92bd8caff591",
      name: "Nocterra Cup",
      location: {
        name: "Nocterra Brewing Company",
        address: "41 Depot St, Powell, OH 43065",
        phoneNum: "(614) 896-8000"
      },
      startDate: new Date('2/21/2022'),
      endDate: new Date('2/22/2022'),
      availableTimes: {
        Sunday: [],
        Monday: ['2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00'],
        Tuesday: ['2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00'],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      setup: {
        holesPlayed: 9,
        playersPerTeam: 2,
        maxTeams: 30,

      },
      price: 30,
      eventType: "Tournament"
    }
  ]

  constructor(private http: HttpClient ) { }

  getEvents() : SSEvent[] {
    return this.events;
  }

  getEventInfo(eventID): Promise<SSEvent> {
    return new Promise((resolve, reject) => {
      this.http.get<{event: SSEvent}>(environment.apiUrl + "events/findById/" + eventID).subscribe(responseData => {
        if (responseData) {
          resolve(responseData.event)
        }
      })
    })
  }

  createTeam(player1, player2, team, eventID) {
    let body = {
      player1: player1,
      player2: player2,
      team: team,
      eventID
    }

    return new Promise((resolve, reject) => {
      this.http.post<{url: string, status: number}>(environment.apiUrl + "events/teamSignup", body).subscribe(responseData => {
        console.log(responseData.status)
        if (responseData.url) {
          window.open(responseData.url);
          resolve(responseData)
        }
      }, error => {
        console.log(error)
        reject(error)
      })
    })
  }

}
