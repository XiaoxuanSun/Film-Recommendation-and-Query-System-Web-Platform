import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Movie } from '../movie';
// import { HomeSixCarouselComponent } from '../home-six-carousel/home-six-carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pauseOnHover = true;

  //public movies : any = [1,2,3,4,5];
  public movieUrl_PopM: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/popular_movie';
  public titleName_PopM: string = 'Popular Movies';

  public movieUrl_TopM: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/top_movie';
  public titleName_TopM: string = 'Top Rated Movies';

  public movieUrl_TrenM: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/trending_movie';
  public titleName_TrenM: string = 'Trending Movies';

  public movieUrl_PopT: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/popular_tv';
  public titleName_PopT: string = 'Popular TV Shows';

  public movieUrl_TopT: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/top_tv';
  public titleName_TopT: string = 'Top Rated TV Shows';

  public movieUrl_TrenT: string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/trending_tv';
  public titleName_TrenT: string = 'Trending TV Shows';

  public media_Movie: string = 'movie';
  public media_Tv: string = 'tv'
  continueList = this.getContinue();
  constructor(private appService: AppService ) { 
    
  }
  getContinue() {
    var continueList = localStorage.getItem('continue');
    if (continueList) {
      // console.info(continueList)
      return JSON.parse(continueList);
    }
    return [];
  }

  routerLink(id: string, type: string,path:string,title) {
    var ID = id;
    var Path = path;
    localStorage.setItem('moviePath',JSON.stringify({id:ID,path:Path,title:title}))
    this.appService.setContinueList(id,type,title,path)
    location.replace(`/watch/${type}/${id}`)
  }


  ngOnInit(): void {
    // this.getContinue();
    this.res();
  }
  carouselWhith(){
    if(screen.width < 500) {
      return {
        width : '175px'
      }
    }
    return {
      width :screen.width / 6 - screen.width * 0.085 + 'px'
    }
    // return {
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
  
  // fun = () => {
  //   var width = screen.width;
  //   var count = width / 300;
  //   if (count <= 2) {
  //     this.show = false
  //   }
  //   return count
  // }
  show = true
  res() {
    var items = this.continueList;
    if(!items){
      items = [];
    }
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

    //console.info(res);
  
    if( res.length <= 1 || !res){
      this.showNavigationArrows = false;
      this.show = false;
      // this.titleDisplay = false
    }
     if(res.length < 1 || !res){
      this.titleDisplay = false
    }
   
    this.continueList = res;
  }
  titleDisplay = true;
  showNavigationArrows = true;
}
