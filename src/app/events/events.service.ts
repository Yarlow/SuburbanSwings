import { UserService } from './../users/user.service';
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SSEvent } from './event.model'
import { SSLocation } from './location.model'
import { SSTeam } from './team.model';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsUpdated = new Subject<SSEvent[]>()

  events: SSEvent[] = [
    {
      _id: "61ea22c77deb92bd8caff591",
      name: "Moth Cup",
      location: {
        name: "Nocterra Brewing Co.",
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
      setupAndRules: {
        holesPerRound: 9,
        playersPerTeam: 2,
        maxTeams: 16,

      },
      price: 60,
      eventType: "Tournament",
      summaryText: "Teams of 2 will compete to win The Moth Cup, a custom trophy made by our brewer, and two $50 Nocterra gift cards. The course is a 9-hole par 3 course and is expected to take about one hour per team to play.",
      image: "assets/Moth_Cup_4x3-min.jpg"
    }
  ]

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  getEvents() : SSEvent[] {
    return this.events;
  }

  getAllEvents() {
    this.http.get<{message: string, events: any}>(environment.apiUrl + 'events')
      .subscribe(response => {
        this.events = response.events
        this.eventsUpdated.next([...this.events])
      })
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

  getEventById(eventID): Promise<SSEvent> {
    return new Promise((resolve, reject) => {
      this.http.get<{event: SSEvent}>(environment.apiUrl + "events/admin/" + eventID).subscribe(responseData => {
        if (responseData) {
          resolve(responseData.event)
        }
      })
    })
  }

  createTeam(players, team, eventID, paymentIntent) {
    let body = {
      players: players,
      team: team,
      eventID,
      paymentIntent: paymentIntent
    }

    return new Promise<{url: string, status: number, message : string, team: SSTeam, expireTime: Date}>((resolve, reject) => {
      this.http.post<{url: string, status: number, message : string, team: SSTeam, expireTime: Date}>(environment.apiUrl + "events/teamSignup", body).subscribe(responseData => {
        console.log(responseData.status)
        if (responseData.message === 'success') {
          resolve(responseData)
        }
        // if (responseData.url) {
        //   window.open(responseData.url);
        //   resolve(responseData)
        // }
      }, error => {
        console.log(error)
        reject(error)
      })
    })
  }

  getEventsUpdateListener() {
    return this.eventsUpdated.asObservable()
  }

  getTeamsByEvent(eventId) {
    console.log("eventId" , eventId);
    return this.http.get<{teams: SSTeam[]}>(environment.apiUrl + "teams/byEventId/" + eventId)
  }

  getJoinableEvents() {
    this.http.get<{events: any}>(environment.apiUrl + 'events/allAvailableForUsers')
      .subscribe(response => {
        this.events = response.events
        this.eventsUpdated.next([...this.events])
      })
  }

  createEvent(event) {
    // console.log(event.name)
    // let name:string = event.name
    let eventData = new FormData();
    eventData.append("name", event.name)
    eventData.append("location", event.location._id)
    eventData.append("availableTimes", event.availableTimes)
    eventData.append("setupAndRules", event.setupAndRules)
    eventData.append("startDate", event.startDate)
    eventData.append("endDate", event.endDate)
    eventData.append("price", event.price)
    eventData.append("eventType", event.eventType)
    eventData.append("summaryText", event.summaryText)
    // eventData.append("image", event.image, event.name)

    // console.log(eventData.get('image'))
    let body = {
      name: event.name,
      location: event.location._id,
      availableTimes: event.availableTimes,
      setupAndRules: event.setupAndRules,
      startDate: event.startDate,
      endDate: event.endDate,
      price: event.price,
      eventType: event.eventType,
      summaryText: event.summaryText,
      image: event.image
    }
    return new Promise((resolve, reject) => {
      this.http.post<{message: string, error: string}>(environment.apiUrl + 'events', body)
        .subscribe(response => {
          if (!response.error) {
            resolve(response);
          } else {
            reject(response.error);
          }
          // this._snackBar.open('Successfully created event', 'X', {
          //   duration: 5000
          // })
          // this.router.navigate(['admin'])
        })

    })
  }

  editEvent(event) {
    // console.log(event.name)
    // let name:string = event.name
    let eventData = new FormData();
    eventData.append("name", event.name)
    eventData.append("location", event.location._id)
    eventData.append("availableTimes", event.availableTimes)
    eventData.append("setupAndRules", event.setupAndRules)
    eventData.append("startDate", event.startDate)
    eventData.append("endDate", event.endDate)
    eventData.append("price", event.price)
    eventData.append("eventType", event.eventType)
    eventData.append("summaryText", event.summaryText)
    // eventData.append("image", event.image, event.name)

    // console.log(eventData.get('image'))
    let body = {
      _id: event._id,
      name: event.name,
      location: event.location._id,
      availableTimes: event.availableTimes,
      setupAndRules: event.setupAndRules,
      startDate: event.startDate,
      endDate: event.endDate,
      price: event.price,
      eventType: event.eventType,
      summaryText: event.summaryText,
      image: event.image
    }
    return new Promise ((resolve, reject) => {
      this.http.patch<{message: string, error: string}>(environment.apiUrl + 'events', body)
        .subscribe(response => {
          if (!response.error) {
            resolve(response);
          } else {
            reject(response.error);
          }
        })
    } )
  }
  
  createPaymentIntent(event, teamId) {
    var userData = this.userService.getUserData()
    return this.http.post<PaymentIntent>(
      `${environment.apiUrl}payments/event/paymentIntent`,
      { event, user: userData, teamId }
    );
  }

}
