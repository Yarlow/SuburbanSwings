import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-event-countdown',
  templateUrl: './event-countdown.component.html',
  styleUrls: ['./event-countdown.component.scss']
})
export class EventCountdownComponent implements OnInit {

  @Input() expireTime: Date;

  private subscription: Subscription;
  
  public dateNow = new Date();
  public dDay = new Date('Jan 01 2023 00:00:00');
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToExpire;
  public minutesToExpire;
  // public hoursToExpire;
  // public daysToExpire;

  constructor() { }

  private getTimeDifference () {
    this.expireTime = new Date(this.expireTime);
    this.timeDifference = this.expireTime.getTime() - new  Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
      this.secondsToExpire = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToExpire = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      // this.hoursToExpire = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      // this.daysToExpire = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
      if (!this.secondsToExpire && !this.minutesToExpire) {
        // redirert
        location.reload();
      }
  }

  ngOnInit() {
    this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
