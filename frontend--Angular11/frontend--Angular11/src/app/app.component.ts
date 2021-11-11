import { Component, Injectable,Inject } from '@angular/core';
import { AppService } from './app.service';
import { Movie } from './movie';

import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
// const WIKI_URL = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/multi_search/';
// const PARAMS = new HttpParams({
//   fromObject: {
//     action: 'opensearch',
//     format: 'json',
//     origin: '*'
//   }
// });
@Injectable()
export class WikipediaService {
  constructor(
    private http: HttpClient
  ) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    let url = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/multi_search/' + term;
    return this.http.get(url);
  }
}

// @NgModule({
//   imports: [
//     RouterModule
//   ]
// })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WikipediaService],
})
export class AppComponent {
  title = 'USC Films';
  public isMenuCollapsed = true;

  public model: any;
  searching = false;
  searchFailed = false;

  constructor(
    private http: HttpClient,
    private _service: WikipediaService,
    private appService: AppService
  ) { }
  public SearchUrl: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/multi_search/';


  formatter = (x: { title: string }) => x.title;

  search: OperatorFunction<string, any> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        term === '' ? []
          : this._service.search(term)
      )
    )
  routerLink(id: string, type: string, title: string, path: string) {
    var ID = id;
    var Path = path;
    var title = title;
    localStorage.setItem('moviePath', JSON.stringify({ id: ID, path: Path, title: title }))
    this.appService.setContinueList(id, type, title, path)
    
    location.replace(`/watch/${type}/${id}`)
  }

  footStyle() {
    var deviceTypeId = this.appService.getDevice();
    var style = { 'margin-top': '3%;' };
    if (deviceTypeId == 1) {
      style = {
        'margin-top': '3%;'
      }
    }
    else if (deviceTypeId == 2) {
      style = {
        'margin-top': '15%;'
      }
    }
    return style;

  }
}
