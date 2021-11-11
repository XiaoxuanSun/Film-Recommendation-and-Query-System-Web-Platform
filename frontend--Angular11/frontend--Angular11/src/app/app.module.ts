import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MylistComponent } from './mylist/mylist.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { HomeSixCarouselComponent } from './home-six-carousel/home-six-carousel.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

import { YouTubePlayerModule } from "@angular/youtube-player";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MylistComponent,
    HomeCarouselComponent,
    HomeSixCarouselComponent,
    MovieDetailComponent,
    TvDetailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
