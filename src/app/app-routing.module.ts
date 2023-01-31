import { AccountComponent } from './users/account/account.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
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
import { EventsComponent } from './events/events.component';
import { EventSignupComponent } from './events/event-signup/event-signup.component';
import { AdminComponent } from './users/admin/admin.component';
import { AuthGuard } from './users/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { CreateEventComponent } from './users/admin/create-event/create-event.component';
import { TestComponent } from './test/test.component';

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
    path: 'Booking',
    component: BookingComponent,
    data: {
      headerText: 'Book an Appointment'
    }
  },
  {
    path: 'Booking/:bookingType',
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
  },
  {
    path: 'Events',
    component: EventsComponent,
    data: {
      headerText: 'Planned Events'
    }
  }, {
    path: 'Events/signup/:eventID',
    component: EventSignupComponent,
    data: {
      headerText: 'Event Signup'
    }
  },
  {
    path: 'Login',
    component: LoginComponent,
    data: {
      headerText: 'Sign In'
    }
  },
  {
    path: 'SignUp',
    component: SignUpComponent,
    data: {
      headerText: 'Sign Up'
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      headerText: 'Admin Page'
    }
  },
  {
    path: 'admin/event',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      headerText: 'Create Event'
    }
  },
  {
    path: 'admin/event/:eventID',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      headerText: 'Edit Event'
    }
  }, 
  {
    path: 'Account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      headerText: 'My Account'
    }
  },
  {
    path: 'Test',
    component: TestComponent,
    data: {
      headerText: 'My Account'
    }
  }
];

@NgModule( {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
