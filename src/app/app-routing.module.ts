import { NgModule } from '@angular/core'
import { RouterModule, Routes } from "@angular/router"

import { HomeComponent } from './home/home.component';
import { AboutTheTechComponent } from './about-the-tech/about-the-tech.component'
import { LeaguePlayComponent } from './league-play/league-play.component';
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      headerText: 'Welcome to Suburban Swings!'
    }
  },
  {
    path: 'about-the-tech',
    component: AboutTheTechComponent,
    data: {
      headerText: 'Learn about our technolgy!'
    }
  },
  {
    path: 'league-play',
    component: LeaguePlayComponent,
    data: {
      headerText: 'Join a league'
    }
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: {
      headerText: 'Book an appointment'
    }
  },
  {
    path: 'ContactUs',
    component: ContactUsComponent,
    data: {
      headerText: 'ASK US ANYTHING'
    }
  },
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
