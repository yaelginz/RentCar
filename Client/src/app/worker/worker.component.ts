import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  
  returnedDate:any;
  carReturned:any;
  result:any;
  msg:string;
a:number;
  constructor( private http: Http) { 
    this.returnedDate=new Date(Date.now()).toLocaleString();
  }

  ngOnInit() {
  }


  returned(){
   
    this.a = parseInt(this.carReturned);
this.http.get("http://localhost:6283/api/car/totalCost?idCar="+this.carReturned+"&datereturned="+this.returnedDate)
    .subscribe(t => {
      this.result = t.json()

      if(this.result!=0)
      {
  this.msg="העלות הכוללת של הזמנתך היא:"
  
      }
  
      else{
        this.msg="רכב לא נמצא! הכנס מספר רכב שוב בבקשה."
      }
  
    });
  }

  reset(){
    this.carReturned=null;
 

  }

}
