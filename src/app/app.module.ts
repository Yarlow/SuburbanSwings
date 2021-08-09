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
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './home/home.component'
import { CarouselComponent } from'./home/carousel/carousel.component';
import { AboutTheTechComponent } from './about-the-tech/about-the-tech.component';
import { BookingComponent } from './booking/booking.component';
import { LeaguePlayComponent } from './league-play/league-play.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkytrakDescriptionComponent } from './home/skytrak-description/skytrak-description.component'

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
    SkytrakDescriptionComponent
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
    MatSelectModule
    // MatInput,
    // MatSidenav
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
