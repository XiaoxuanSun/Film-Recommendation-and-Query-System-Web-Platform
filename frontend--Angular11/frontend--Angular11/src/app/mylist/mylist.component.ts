import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service'

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {

  constructor(private appService:AppService) { }

  MoveLst :any= [];
  ngOnInit(): void {
    var myList = localStorage.getItem('MyList');
    var myListJson = myList ? JSON.parse(myList + "") : null;
    if(!myListJson){
      myListJson = [];
    }
    this.MoveLst = myListJson;
    console.info(this.MoveLst)
  }
  routerLink(id:string,type:string,path,title){
    var ID = id;
    var Path = path;
    localStorage.setItem('moviePath',JSON.stringify({id:ID,path:Path,title:title}))
    this.appService.setContinueList(id,type,title,path)

    //
    var myList = localStorage.getItem('MyList');
    var myListJson = myList ? JSON.parse(myList + "") : null;
    var index = -1;
    var myListObj = {};
    if (myListJson) {
      for (const key in myListJson) {
        if (myListJson[key].id == id) {
          index = Number.parseInt(key);
          myListObj = myListJson[key]
          break;
        }
      }
      if(index != -1){
        myListJson.splice(index, 1)
        myListJson.unshift(myListObj)
        localStorage.setItem('MyList', JSON.stringify(myListJson));
      }
    } 
     
    location.replace(`/watch/${type}/${id}`)

  }
  carouselWhith(){
    console.info(11)
    if(screen.width < 500) {
      return {
        width : '175px'
      }
    }
    return {
      width :screen.width / 6 - screen.width * 0.08 + 'px'
    }
  }
  // carouselCont(){
  //   if(screen.width < 500) {
  //     return {
  //       display : 'block',
  //       top:'3rem'
  //     }
  //   }
  //   return {}
  // }
}
