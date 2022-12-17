import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SSEvent } from '../../event.model';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.css']
})
export class EventsListItemComponent implements OnInit {

  faInfo = faInfo;
  faInfoCircle = faInfoCircle;
  
  @Input() eventElement : SSEvent;
  availableSlots: number = 0
  showInfo: boolean = false;

  constructor( private router: Router ) { }

  ngOnInit(): void {
    this.showInfo = false;
    for (let day of Object.keys(this.eventElement.availableTimes)) {
      console.log(this.eventElement.availableTimes[day].length)
      this.availableSlots += this.eventElement.availableTimes[day].length
    }
  }

  onGoToSignup() {
    this.router.navigate(['Events/signup', this.eventElement._id])
  }

  openInformationPopup() {
    this.showInfo = !this.showInfo;
  }

}
