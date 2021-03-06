import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SSEvent } from '../../event.model';

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.css']
})
export class EventsListItemComponent implements OnInit {

  @Input() eventElement : SSEvent;
  availableSlots: number = 0

  constructor( private router: Router ) { }

  ngOnInit(): void {
    for (let day of Object.keys(this.eventElement.availableTimes)) {
      console.log(this.eventElement.availableTimes[day].length)
      this.availableSlots += this.eventElement.availableTimes[day].length
    }
  }

  onGoToSignup() {
    this.router.navigate(['Events/signup', this.eventElement._id])
  }

}
