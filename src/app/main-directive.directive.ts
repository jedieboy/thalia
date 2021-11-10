import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

@Directive({
  selector: '[animate-scroll]'
})
export class animateScroll implements OnInit{

  constructor(private router: Router,  private location: Location) { 
  }
  ngOnInit() {
      
  }

}
export const SharedDirective: any[] = [
animateScroll
]
