import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SSEvent } from 'src/app/events/event.model';
import { EventsService } from 'src/app/events/events.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  events: SSEvent[] = []
  eventsSub: Subscription

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {

    this.eventsService.getAllEvents()
    this.eventsSub = this.eventsService.getEventsUpdateListener().subscribe( (events: SSEvent[]) => {
      this.events = events
      console.log(events)
    })
  }

}
