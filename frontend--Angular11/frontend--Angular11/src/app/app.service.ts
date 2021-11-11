import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public currentUrl = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/current_playing';

  public currentUrl2 = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/trending_movie';

  constructor(private http: HttpClient) { }

  getCurrent(): Observable<Movie[]> {
    var res = this.http.get<Movie[]>(this.currentUrl);
    return res
      .pipe(
        tap(_ => {

        }),
      );
  }
  async getCurrentUrl2() {
    var res = await this.http.get<Movie[]>(this.currentUrl2).toPromise();
    return res;
    // .pipe(
    //   tap(i => {
    //   }),
    // );


  }
  setContinueList(id, type, title, path) {
    //console.info(3);
    var continueList = localStorage.getItem('continue')
    if (continueList) {
      var continueListJson = JSON.parse(continueList);
      if (continueListJson) {
        var continueObj = continueListJson.filter(m => m.id == id)
        if (continueObj.length == 1) {
          var index = continueListJson.indexOf(continueObj[0]);
          continueListJson.splice(index, 1)
          continueListJson.unshift(continueObj[0])
          // delete continueListJson[continueListJson.indexOf(continueObj[0])]
        } else {
          if (continueListJson.length == 24) {
            continueListJson.splice(23, 1)
            continueListJson.unshift({ id: id, type: type, poster_path: path, title: title })
          } else {

            if (continueObj.length <= 0) {
              continueListJson.unshift({ id: id, type: type, poster_path: path, title: title })
            }
          }
        }


      } else {
        continueListJson = [{ id: id, type: type, poster_path: path, title: title }]
      }
      localStorage.setItem('continue', JSON.stringify(continueListJson))
    } else {
      var continueListJsonObj = [{ id: id, type: type, poster_path: path, title: title }]
      localStorage.setItem('continue', JSON.stringify(continueListJsonObj))
    }
  }

  //1 :电脑， 2:代表手机 6、7、8plus
  getDevice() {
    if (screen.width < 500) {
      return 2
    } else if (screen.width < 2000) {
      return 1
    }
    return 1
  }

}
