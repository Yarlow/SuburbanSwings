import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toolbar: string = "home"
  toolbarText: string = "Welcome to Suburban Swings!"


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
  }

  onNavigate(navTo : string){
    if (navTo === "home"){
      this.toolbarText = "Welcome to Suburban Swings!"
    } else if (navTo === "tech"){
      this.toolbarText = "Learn our tech"
    } else if (navTo === "booking"){
      this.toolbarText = "Book an apt"
    } else if (navTo === "league"){
      this.toolbarText = "Join league"
    } else if (navTo === "contact"){
      this.toolbarText = "gib us a call"
    }
  }

}
