import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  Device = 1;
  carouselTopClass = 'ngb-carousel1'
  pauseOnHover = true;
  // showName:boolean=true;

  movies: Movie[] = [];
  constructor(private appService: AppService) {
    this.getCurrent();
  }

  getCurrent(): void {
    this.appService.getCurrent().subscribe(movies => this.movies = movies);
    this.Device = this.appService.getDevice();
    if(this.Device == 2){
      this.carouselTopClass = 'ngb-carousel2'
    }
    //console.log(this.movies)
  }

  ngOnInit(): void {
    //console.info(2);
  }

  routerLink(id: string, path: string, title: string) {
    var ID = id;
    var Path = path;
    localStorage.setItem('moviePath', JSON.stringify({ id: ID, path: Path,title:title }))
    this.appService.setContinueList(id, 'movie', title, path)
    
    location.replace(`/watch/movie/${id}`)
  }

  movieWrapperImgStyleMousseenter() {
    this.imgStyle = false
  }
  movieWrapperImgStyleMouseout(){
    this.imgStyle = true
  }
  imgStyle = true
  movieWrapperImgStyle(url) {
    var style = {};
    if (this.imgStyle) {
      style = {
        'background-size' : '100% 100%;',
        // height: '720px',
        // 'background-image': `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0)), url(${url})`
        'background-image': ` url(${url})`,
        // ':hover': `background:url("${url}") 0 0 repeat, linear-gradient(to right, #6fb7ff, #1f81e2)`,

        // 'background-image': ` url(${url})`,
      };
    } else {
      style = {
        width: '1280px',
        height: '720px',
        'background-image': `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0)), url(${url})`
        // 'background-image': ` url(${url})`,
        // ':hover': `background:url("${url}") 0 0 repeat, linear-gradient(to right, #6fb7ff, #1f81e2)`,

        // 'background-image': ` url(${url})`,
      };
    }
    return style;
  }

}
