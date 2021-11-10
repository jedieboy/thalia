import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Location} from '@angular/common';
@Component({
  selector: 'nav-container',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  page = 'home';
  navbarOpen = false;
  constructor(private commonservice: CommonService, private router : Router, private route : ActivatedRoute,
    private location : Location) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e:any) {
    let element = document.querySelector('.navbar');
    if(element){
      //For navbar background
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-bg');
        element.classList.add('navbar-wt');
      } else {
        element.classList.remove('navbar-bg');
        element.classList.remove('navbar-wt');
      }
      const home = document.getElementById('home')
      const story = document.getElementById('story')
      const youtube = document.getElementById('youtube')
      const about = document.getElementById('about')

    //To set highlight page when scroll  
    if(window.pageYOffset > home.offsetTop - 90 && window.pageYOffset < home.getBoundingClientRect().height + home.offsetTop - 90){
      this.page = 'home'
    }else if(window.pageYOffset > story.offsetTop -90 && window.pageYOffset < story.getBoundingClientRect().height + story.offsetTop - 90){
      this.page = 'story'
    }else if(window.pageYOffset > youtube.offsetTop - 90 && window.pageYOffset < youtube.getBoundingClientRect().height + youtube.offsetTop - 90){
      this.page = 'youtube'
    }else if(window.pageYOffset > about.offsetTop - 90 && window.pageYOffset < about.getBoundingClientRect().height + about.offsetTop - 90){
      this.page = 'about'
    }
    }
  }

  ngOnInit(){
  }

  //To open container for mobile devices
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  //To change url when clicking nav page
  setPage(page){
    this.page = page;
    this.location.replaceState('/'+page)
    this.commonservice.setPage(page);
  }
}
