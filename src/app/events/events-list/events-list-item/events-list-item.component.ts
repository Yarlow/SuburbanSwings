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

  constructor( private router: Router ) { }

  ngOnInit(): void {
    console.log(this.eventElement)
  }

  onGoToSignup() {
      this.router.navigate(['Events/signup', this.eventElement._id])
  }

}
