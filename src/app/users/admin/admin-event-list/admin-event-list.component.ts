import { Component, Input, OnInit } from '@angular/core';
import { SSEvent } from 'src/app/events/event.model';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css']
})
export class AdminEventListComponent implements OnInit {

  @Input() eventElement : SSEvent;


  selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onEventSelected() {
    this.selected = !this.selected;
    if (this.selected) {

    }
  }

}
