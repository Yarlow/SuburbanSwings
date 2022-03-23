import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SSEvent } from './event.model'
import { SSLocation } from './location.model'
import { SSTeam } from './team.model';

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

  constructor(private http: HttpClient ) { }

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

  createTeam(players, team, eventID) {
    let body = {
      players: players,
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
    eventData.append("image", event.image, event.name)

    console.log(eventData.get('image'))

    this.http.post<{message: string}>(environment.apiUrl + 'events', eventData)
      .subscribe(response => {
        console.log(response.message)
      })
  }

}
