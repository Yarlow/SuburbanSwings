import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCarouselModule } from '@ngbmodule/material-carousel'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './home/home.component'
import { CarouselComponent } from'./home/carousel/carousel.component';
import { AboutTheTechComponent } from './about-the-tech/about-the-tech.component';
import { BookingComponent } from './booking/booking.component';
import { LeaguePlayComponent } from './league-play/league-play.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkytrakDescriptionComponent } from './home/skytrak-description/skytrak-description.component';
import { SignupComponent, LeagueSignupConfirmDialog } from './league-play/signup/signup.component';
import { FAQComponent } from './faq/faq.component';
import { HeartstateComponent } from './heartstate/heartstate.component';
import { WalkInComponent } from './heartstate/walk-in/walk-in.component';
import { PaymetSuccessComponent } from './league-play/signup/paymet-success/paymet-success.component';
import { PaymetCancelComponent } from './league-play/signup/paymet-cancel/paymet-cancel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsListItemComponent } from './events/events-list/events-list-item/events-list-item.component';
import { EventSignupComponent, EventSignupConfirmDialog } from './events/event-signup/event-signup.component';
import { AdminComponent } from './users/admin/admin.component';

// import { StripePaymentComponent } from './league-play/signup/stripe-payment/stripe-payment.component'
// import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    AboutTheTechComponent,
    BookingComponent,
    LeaguePlayComponent,
    ContactUsComponent,
    SkytrakDescriptionComponent,
    SignupComponent,
    FAQComponent,
    HeartstateComponent,
    WalkInComponent,
    PaymetSuccessComponent,
    PaymetCancelComponent,
    LeagueSignupConfirmDialog,
    EventsComponent,
    EventsListComponent,
    EventsListItemComponent,
    EventSignupComponent,
    EventSignupConfirmDialog,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    FontAwesomeModule,
    MatSelectModule,
    NgxHideOnScrollModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
    // NgxStripeModule.forRoot('pk_test_51JtfA0GnXfM47IJy8Jc0EiBvuiLDlgo3K8rSOFHBIF2OxybYsFyo5cf6vKwLvvlcrNLhadkHmPSyHJiWG4QKDtJN00O2Ru2FXn'),
    // MatInput,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
