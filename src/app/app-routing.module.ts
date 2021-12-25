import { NgModule } from '@angular/core'
import { RouterModule, Routes } from "@angular/router"

import { HomeComponent } from './home/home.component';
import { AboutTheTechComponent } from './about-the-tech/about-the-tech.component'
import { LeaguePlayComponent } from './league-play/league-play.component';
import { BookingComponent } from './booking/booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SignupComponent } from './league-play/signup/signup.component';
import { FAQComponent } from './faq/faq.component';
import { HeartstateComponent } from './heartstate/heartstate.component';
import { PaymetSuccessComponent } from './league-play/signup/paymet-success/paymet-success.component';
import { PaymetCancelComponent } from './league-play/signup/paymet-cancel/paymet-cancel.component';

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
    path: 'league',
    component: LeaguePlayComponent,
    data: {
      headerText: 'Join a league'
    }
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: {
      headerText: 'Book an Appointment'
    }
  },
  {
    path: 'ContactUs',
    component: ContactUsComponent,
    data: {
      headerText: 'Need Info? Ask Here'
    }
  },
  {
    path: 'League/SignUp',
    component: SignupComponent,
    data: {
      headerText: 'League Sign Up'
    }
  },
  {
    path: 'FAQ',
    component: FAQComponent,
    data: {
      headerText: 'Frequently Asked Questions'
    }
  },
  {
    path: 'Heart-State-Brewing',
    component: HeartstateComponent,
    data: {
      headerText: 'Heart State Brewing Company'
    }
  },
  {
    path: 'Payment-Success',
    component: PaymetSuccessComponent,
    data: {
      headerText: 'Thanks for signing up'
    }
  },
  {
    path: 'Payment-Cancel',
    component: PaymetCancelComponent,
    data: {
      headerText: 'Payment Cancelled'
    }
  }
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
