import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides=[{'image': 'assets/That me.jpg'}, {'image': 'assets/Dragon Dick.PNG'},{'image': 'assets/golfclubs.jpg'}, {'image': 'assets/CHrimssas hat.png'}, {'image': 'assets/35-5dce8d0641859__700.jpg'}]

  constructor() { }

  ngOnInit(): void {
  }

}
