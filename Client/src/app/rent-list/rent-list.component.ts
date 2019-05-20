import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { StatiService } from 'src/app/stati.service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent  {
 
b1:boolean=false;
result:any;
  constructor(
    private http: Http, 
    private st: StatiService) {
  }

  rentlist() {
this.b1=true;
 
  this.http.get("http://localhost:6283/api/car/rentlist?k800=" + this.st.getUserLogIn().Id )
  .subscribe(t => {
   this.result = t.json()

   });
    
}




}
