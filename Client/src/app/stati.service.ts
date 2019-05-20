import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatiService {
  currUser = null;

  constructor() { }

  selectedcar1: any;
  today1: any;

  getValue() {
    return this.selectedcar1;
  }

  updateVal(val) {
    this.selectedcar1 = val;
  }


  getDate() {
    return this.today1;
  }

  updatedate(val) {
    this.today1 = val;
  }

  initUserLogedIn(user) {
    this.currUser = user;
  }

  isUserLogIn(): boolean {
    return this.currUser ? true : false;
  }

  getUserLogIn() {
    return this.currUser;
}


}



