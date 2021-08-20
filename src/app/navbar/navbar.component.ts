import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @HostListener('window:resize', ['$event']) onResize(event) {
      if (event.target.innerwidth < 700) {
        this.mobile = true;
        this.showNav = false;
      }
  }

  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faBars = faBars
  faTimes = faTimes

  toolbar: string = "home"
  toolbarText: string = "Welcome to Suburban Swings!"
  mobile: boolean = false;
  showNav: boolean = false;


  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd){
        if (this.mobile){
          this.showNav = false;
        }
        window.scrollTo(0,0)
        this.toolbarText = this.activatedRoute.children[0].snapshot.data.headerText
        // console.log(activatedRoute.data)
        // this.toolbarText = activatedRoute.data['headerText']
        // // console.log(this.activatedRoute.data)
      }
    })

  }

  ngOnInit(): void {
    if (window.screen.width < 700) {
      this.mobile = true;
      this.showNav = false;
    }
  }

}
