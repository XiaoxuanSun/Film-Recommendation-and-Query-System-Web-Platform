import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MylistComponent } from './mylist/mylist.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mylist', component: MylistComponent},
  {path: 'watch/movie/:id', component: MovieDetailComponent},
  {path: 'watch/tv/:id', component: TvDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
