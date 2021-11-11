import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css']
})
export class TvDetailComponent implements OnInit {

  closeResult = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer:DomSanitizer,
    private modalService: NgbModal,
  ) { }

  id = 0;
  keyWord = "";
  title = "";
  staticAlertClosed = false;
  successMessage = '';

  twitterUrlTitle = "";

  @ViewChild('staticAlert', { static: false }) staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getDetail(this.id);
    // this.getMovieAction();
    // console.info(this.id)
    this.movieUrl_RecomT = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/recommend_tv/' + this.id;
    this.movieUrl_SimilT = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/similar_tv/' + this.id;
    this.getMovieAction();

    //get path
    var moviePathObj = localStorage.getItem('moviePath');
    var moviePathObjJson = moviePathObj ? JSON.parse(moviePathObj + "") : null;
    if(moviePathObjJson){
      this.poster_path =  moviePathObjJson.path;
      this.title = moviePathObjJson.title;
    }

    setTimeout(() => this.staticAlert.close(), 50000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this.twitterUrlTitle = encodeURIComponent(this.title);
  }
  poster_path = "";
  public movieUrl_RecomT : string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/recommend_tv/' + this.id;
  public titleName_RecomT : string='Recommended TV Shows';
  public media_Movie: string = 'tv';

  public movieUrl_SimilT : string = 'https://xiaox-sun-nodejs-1.wl.r.appspot.com/similar_tv/' + this.id;
  public titleName_SimilT : string='Similar TV Shows';

  getDetail(id: number) {
    var url = "https://xiaox-sun-nodejs-1.wl.r.appspot.com/tv_detail/" + id;
    var res = this.http.request("GET", url, { responseType: 'json' })
    res.subscribe(m => {
      this.obj = m;
      console.info(m);
    })
  }
  obj :any= {}
  MyListFun() {
    var myList = localStorage.getItem('MyList');
    var myListJson = myList ? JSON.parse(myList + "") : null;
    if (!myListJson) {
      myListJson = [{ id: this.id, type: "tv",poster_path:this.poster_path, title:this.title }]
    } else {
      var flag = -1;
      for (const key in myListJson) {
        if (myListJson[key].id == this.id) {
          flag = Number.parseInt(key);
          break;
        }
      }
      if (flag != -1) {
         myListJson.splice(flag,1)
      } else {
        myListJson.unshift({ id: this.id, type: "tv",poster_path:this.poster_path,title:this.title })
      }

    }
    localStorage.setItem('MyList', JSON.stringify(myListJson));
    console.info(myListJson);
    this.getMovieAction();
    this._success.next(this.movieActionCon)
  }
  movieAction = 'Add to Watchlist';
  movieActionCon = 'Added to watchlist.'
  alertColor = "success"

  getMovieAction() {
    var myList = localStorage.getItem('MyList');
    var myListJson = myList ? JSON.parse(myList + "") : null;

    var flag = true;
    for (const key in myListJson) {
      if (myListJson[key].id == this.id) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      this.movieAction = "Remove from Watchlist";
      this.movieActionCon = "Added to watchlist.";
      this.alertColor = "success";
    } else {
      this.movieAction = 'Add to Watchlist';
      this.movieActionCon = 'Removed from watchlist.';
      this.alertColor = "danger";
    }
  }

  // modal
  castDetails:any={}
  castProfile:any=""
  castName:any=""
  open(castid:any,castNm:any,castProfilePath:any,content:any) {
    this.castName = castNm;
    this.castProfile = castProfilePath;
    var url = "https://xiaox-sun-nodejs-1.wl.r.appspot.com/cast_detail/" + castid;
    var res = this.http.request("GET", url, { responseType: 'json' })
    res.subscribe(m => {
      this.castDetails = m;
      console.info(this.castDetails);
    })
    this.modalService.open(content, { scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private _success = new Subject<string>();

  public changeSuccessMessage() {  }

  reviewRating(){
    if(screen.width < 500) {
      return {
        display : 'block',
      }
    }
    return {}
  }
}