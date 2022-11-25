import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isAuthenticated: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoAuthUser()
  }


}
