import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SSEvent } from '../events/event.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  availableTimes = {
    Wednesday: ['3:30', '5:00', '6:30', '8:00'],
    Thursday: ['3:30', '5:00', '6:30', '8:00'],
    Sunday: ['12:30', '2:00', '3:30', '5:00', '6:30', '8:00']
  }

  constructor(private http: HttpClient ) { }


  getSeasonInfo() : Promise<SSEvent> {
    return new Promise((resolve, reject) => {
      this.http.get<{event: SSEvent}>(environment.apiUrl + "events/findById/" + "61edb9bc428ebd6033df93fa").subscribe(responseData => {
        if (responseData) {
          resolve(responseData.event)
        }
      })
    })
  }

  getTimes() {

    return this.availableTimes
  }

  createTeam(player1, player2, team) {
    let body = {
      player1: player1,
      player2: player2,
      team: team
    }

    // this.http.post<{url: string}>('http://localhost:5000/payments/', body)
    //   .subscribe(responseData => {
    //       console.log(responseData)
    //       window.open(responseData.url, "_blank");
    //       return responseData
    //     })

    return new Promise((resolve, reject) => {
      this.http.post<{url: string, status: number}>(environment.apiUrl + "teams/", body).subscribe(responseData => {
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
