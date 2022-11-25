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
import { MatChipsModule } from '@angular/material/chips'
import {MatTooltipModule} from '@angular/material/tooltip';

import { environment } from "../environments/environment";
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
import { AdminEventListComponent } from './users/admin/admin-event-list/admin-event-list.component';
import { AdminEventViewComponent } from './users/admin/admin-event-list/admin-event-view/admin-event-view.component';
import { LoginComponent } from './users/login/login.component';
import { CreateEventComponent, EventCreatePreviewDialog } from './users/admin/create-event/create-event.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { AboutUsGridComponent } from './home/about-us/about-us-grid/about-us-grid.component';
import { EventDetailsComponent } from './home/event-details/event-details.component';
import { AdminLocationsComponent } from './users/admin/admin-locations/admin-locations.component';
import { FooterComponent } from './footer/footer.component';
import { ReviewsComponent } from './home/reviews/reviews.component';

// import { StripePaymentComponent } from './league-play/signup/stripe-payment/stripe-payment.component'
import { NgxStripeModule } from 'ngx-stripe';
import { StripeFormComponent } from './events/event-signup/stripe-form/stripe-form.component';
import { AccountComponent } from './users/account/account.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { UserEventsComponent } from './users/account/user-events/user-events.component';
import { UserTeamsComponent } from './users/account/user-teams/user-teams.component';
import { EventCountdownComponent } from './events/event-signup/event-countdown/event-countdown.component';
import { PhoneMaskDirective } from './directives/phone-mask.directive';

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
    AdminComponent,
    AdminEventListComponent,
    AdminEventViewComponent,
    LoginComponent,
    CreateEventComponent,
    EventCreatePreviewDialog,
    AboutUsComponent,
    AboutUsGridComponent,
    EventDetailsComponent,
    AdminLocationsComponent,
    FooterComponent,
    ReviewsComponent,
    StripeFormComponent,
    AccountComponent,
    SignUpComponent,
    UserEventsComponent,
    UserTeamsComponent,
    EventCountdownComponent,
    PhoneMaskDirective
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
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    NgxStripeModule.forRoot(environment.stripePubKey),
    // MatInput,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
