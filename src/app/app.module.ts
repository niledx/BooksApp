import { ProfileModule } from './features/profile/profile.module';
import { BooksModule } from './features/books/books.module';
import { BooksComponent } from './features/books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './core/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { LandingComponent } from './shared/components/landing/landing.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    BooksModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
