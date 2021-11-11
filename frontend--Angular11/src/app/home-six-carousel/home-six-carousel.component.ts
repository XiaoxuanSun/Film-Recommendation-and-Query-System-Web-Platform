import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Movie } from '../movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { $ } from 'protractor';

@Component({
  selector: 'app-home-six-carousel',
  templateUrl: './home-six-carousel.component.html',
  styleUrls: ['./home-six-carousel.component.css']
})
export class HomeSixCarouselComponent implements OnInit {
  @Input() movieUrl: any;
  @Input() name: any;
  @Input() mediaType: any;
  

  showName:boolean=true;

  // movies : Movie[] = [];
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  items: any = [];
  carouselWhith(){
    if(screen.width < 500) {
      return {
        width : '175px'
      }
    }
    return {
      width :screen.width / 6 - screen.width * 0.085 + 'px'
    }
    //  return {
    //   width :'11%'
    // }
  }
  fun = () => {
    var width = screen.width;
    var count = 6;
    if(screen.width < 500) {
      count = 1;
    }
    if(count <=2 ){
      this.show = false
    }
    return count
  }
  
  res() {
    var items = this.items;
    var res = new Array();
    var count = 0;
    var item = new Array();

    var temp = parseInt(this.fun() + "");

    for (let index = 0; index < items.length; index++) {
      item.push(items[index]);
      count += 1
      if (count == temp || items.length - 1 == index) {
        count = 0;
        res.push(item)
        item = new Array();
      }
    }

   // console.info(res);
    this.items = res;
  }
  ngOnInit(): void {
    var res = this.http.get<[]>(this.movieUrl);
    res.subscribe(movies => {
      this.items = movies;
      this.res();
    });

  
  }

  show = true

  // items = this.res();

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  home_six_carousel_name = "this is a text";

  routerLink(id:string,path:string,title:string){
    var ID = id;
    var Path = path;
    localStorage.setItem('moviePath',JSON.stringify({id:ID,path:Path,title:title}))
    this.appService.setContinueList(id,this.mediaType,title,path)
    
    location.replace(`/watch/${this.mediaType}/${id}`)
  }


}
