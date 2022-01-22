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

  events: SSEvent[];
  eventSubscription: Subscription;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();
  }

}
