import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { StatiService } from 'src/app/stati.service';



@Component({
  selector: 'app-selectcar',
  templateUrl: './selectcar.component.html',
  styleUrls: ['./selectcar.component.css']
})
export class SelectcarComponent implements OnInit{
  curUser;
  StartDate: any;
  Days: any;
  CarSelected: any = this.st.getValue();
  msg: string;
  msg2: string;
  result: any;
  result3: boolean;
  a: any;
  b: boolean = false;
  adress: string;
  i: number = 1;
  b2: boolean;
  b3: boolean;
  result2: any;
  b4:boolean;
  b5:boolean=false;

  constructor(
    private staticService: StatiService,
    private http: Http,
    private st: StatiService) {
    this.CarSelected = st.getValue();
    this.StartDate=new Date(Date.now()).toLocaleString();
    // new Date().toJSON().slice(0,10);
    // 


    this.branchavailable();
   

  }


  ngOnInit() {
    this.curUser = this.staticService.getUserLogIn()
  }
  Date() {

    
    this.http.get("http://localhost:6283/api/car?cartype=" +  this.CarSelected.Type + "&branch=" + this.adress)
      .subscribe(t => {
        this.result = t.json()

        if (this.result.b == true) {
          // this.msg = "הרכב זמין, פרטים נוספים בנוגע להזמנתך"
          this.b = true;
          this.a = parseInt(this.Days);
          this.b4=true;
        }
    
        else if(this.result==false){
          // this.msg = "לצערינו הרכב לא זמין, חזור לדף החיפוש"
          this.b = false;
          this.b4=false;
        }
    



    
      });
  
   
  }

  branchavailable() {


    this.http.get("http://localhost:6283/api/car/Getbranch?k=1").subscribe(t => { this.result2 = t.json() });

  }

  booking() {

 
    this.http.get("http://localhost:6283/api/car/updateBooking?idCar=" + this.result.carid + "&userId=" + this.st.getUserLogIn().Id + "&locationStartDay=" + this.StartDate + "&days=" + this.a)
    .subscribe(t => {
      this.result3 = t.json()

      if(this.result3==true)
      {
  this.msg2="הזמנתך נקלטה בהצלחה, עליך לאסוף את הרכב מהסניף. נסיעה טובה!"
  
      }
   else{
    this.msg2="הזמנה לא נקלטה, נסה שנית בבקשה"
  
   }

   window.alert(this.msg2);
    });
    
}




change(){
  if(this.adress==undefined||parseInt(this.Days)<0||parseInt(this.Days)>50||this.Days==undefined){
    this.b5=false;
    
  }
 
  else{
    this.b5=true;
  }
}
}
