import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../events.service';
import { SSEvent } from '../event.model'

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events: SSEvent[] = [];
  eventsSub: Subscription;
  isLoading: boolean = false;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    // let tempevents = this.eventsService.getEvents();
    // // make this better
    // let today = new Date()
    // console.log(today)
    // for (let event of tempevents) {
    //
    //   console.log("today > event", today > event.startDate)
    //   console.log("today < event", today < event.startDate)
    //   console.log(event.startDate)
    //   if (new Date(event.startDate) > today ) {
    //     console.log("pushin p")
    //     this.events.push(event)
    //   }
    //   console.log(this.events)
    // }
    this.eventsService.getJoinableEvents()
    this.isLoading = true;
    this.eventsSub = this.eventsService.getEventsUpdateListener().subscribe( (events: SSEvent[]) => {
      this.events = events
      // console.log(events)
      this.isLoading = false;
      // let tempevents = events;
      //
      // let today = new Date()
      // console.log(today)
      // for (let event of tempevents) {
      //
      //   console.log("today > event", today > event.startDate)
      //   console.log("today < event", today < event.startDate)
      //   console.log(event.startDate)
      //   if (new Date(event.startDate) > today ) {
      //     console.log("pushin p")
      //     this.events.push(event)
      //   }
      //   console.log(this.events)
      // }
    })
  }

}
