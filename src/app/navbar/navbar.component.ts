import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, NavigationEnd, Event } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faBars = faBars

  toolbar: string = "home"
  toolbarText: string = "Welcome to Suburban Swings!"
  mobile: boolean = false;
  showNav: boolean = false;


  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd){
    //     console.log(activatedRoute.data)
    //     this.toolbarText = activatedRoute.data['headerText']
    //     console.log(this.activatedRoute.data)
    //   }
    // })

  }

  ngOnInit(): void {
    if (window.screen.width < 700) {
      this.mobile = true;
      this.showNav = false;
      console.log("Smol Boi")
    }
  }

  onNavigate(navTo : string){
    if (this.mobile){
      this.showNav = false;
    }
    if (navTo === "home"){
      this.toolbarText = "Welcome to Suburban Swings!"
    } else if (navTo === "tech"){
      this.toolbarText = "Learn our tech"
    } else if (navTo === "booking"){
      this.toolbarText = "BOOK AN FRICKIN APPOINTMENT"
    } else if (navTo === "league"){
      this.toolbarText = "Join league"
    } else if (navTo === "contact"){
      this.toolbarText = "gib us a call"
    }
  }

}
