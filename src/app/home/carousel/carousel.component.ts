import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  slides=[{'image': 'assets/Dragon Dick.PNG'}, {'image': 'assets/billy1.png'}, {'image': 'assets/billy2.png'}, {'image': 'assets/billy3.png'}, {'image': 'assets/billy4.png'}]

  constructor() { }

  ngOnInit(): void {
  }

}
