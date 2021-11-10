import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private pageSetter = new BehaviorSubject('');
  private pageScroll = new BehaviorSubject('');

  setPage(val:any){
    this.pageSetter.next(val)
  }

  getPage(){
    return this.pageSetter.asObservable();
  }

  setPageScroll(val:any){
    this.pageScroll.next(val)
  }

  getPageScroll(){
    return this.pageScroll.asObservable();
  }
}
