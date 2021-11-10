import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'thalia-vlog';

  constructor(private commonservice: CommonService, private router: Router) { }
  ngOnInit() {

    //Animate scroll for initial page
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        setTimeout(() => {
          const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
          let currentUrlPath = window.location.pathname.slice(1).split(urlDelimitators)[0];
          console.log(currentUrlPath)
          let element = document.getElementById(currentUrlPath);
          if(element) {
            const topPos = element.offsetTop;
            window.scrollTo({top:topPos,behavior: 'smooth' });
          }
        }, 10);
      }
   });

   //Animate scroll for nav click page
   this.commonservice.getPage().subscribe(page=>{
     let element = document.getElementById(page);
      if(element) {
        const topPos = element.offsetTop;
        window.scrollTo({top:topPos,behavior: 'smooth' });
      }
   })


  }


}
