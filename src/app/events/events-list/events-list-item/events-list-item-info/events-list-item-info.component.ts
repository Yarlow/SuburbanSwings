import { Component, Input, OnInit } from '@angular/core';
import { SSEvent } from 'src/app/events/event.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-events-list-item-info',
  templateUrl: './events-list-item-info.component.html',
  styleUrls: ['./events-list-item-info.component.scss']
})
export class EventsListItemInfoComponent implements OnInit {
  @Input() eventElement : SSEvent;
  @Input() showInfo : boolean;

  @Output() closePopupEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.eventElement)
  }

  openInformationPopup() {

  }

  closePopup() {
    this.showInfo = false;
    this.closePopupEvent.emit(true);
  }

}
