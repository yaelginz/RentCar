import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { StatiService } from 'src/app/stati.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  currUser;
  title = 'app';
  arr: any[];
  allSelectedCAr: string[] = [];
  result: any;
  result2: any;
  result3: any;
  result4: any;
  result5: any = [];
  selectedCar: object;
  disable: boolean = false;

  bool: boolean;
  bool2: boolean;
  bool3: boolean = false;
  bool4: boolean;
  bool5: boolean;
  
  test100:string;

  year: number;

  test: any;
  test2: any;
  test3: any;
  test4: any;
  today: any;
  selectedRow: any;

  constructor(
    private http: Http,
    private st: StatiService) {
  }



  automat() {
    this.test100="";
    this.bool4 = false;
    this.bool5 = false;

    this.bool2 = false;

    this.http.get("http://localhost:6283/api/car?isautomat=" + this.bool)
      .subscribe(item => {
        this.result = item.json();
      });
  }

  yearavailble() {
    this.test100="";
    this.bool4 = false;
    this.bool5 = false;
    this.bool = false;
    this.http.get("http://localhost:6283/api/car")
      .subscribe(t => {
        this.result2 = t.json();
        this.result = [];
      });
  }

  ngOnInit() {
    this.currUser =  this.st.getUserLogIn();

    this.allSelectedCAr.push(localStorage.CarType.split(','));
    this.test = localStorage.getItem("CarType");
  }

  showyear() {

    //this.bool2=true;

    this.http.get("http://localhost:6283/api/car?year=" + this.test2).subscribe(t => { this.result = t.json() });
  }

  select(c, b: boolean) {
    console.log()
    this.selectedRow = c;


    this.bool3 = b;
    this.disable = true;
    this.st.updateVal(c);
    this.selectedCar = this.st.getValue();

    if (this.allSelectedCAr.indexOf(c.Type, 0) == -1) {
      this.allSelectedCAr.push(c.Type);


      localStorage.CarType = this.allSelectedCAr;
      this.test = localStorage.getItem("CarType");
    }
    console.log(this.allSelectedCAr);
    console.log(localStorage.getItem("CarType"));


  }


  companyavailable() {
    this.test100="";
    this.bool = false;
    this.bool2 = false;
    this.bool5 = false;

    this.http.get("http://localhost:6283/api/car?a=1")
      .subscribe(t => {
        this.result3 = t.json();
        this.result = [];

      });

  }


  showcompany() {

    this.http.get("http://localhost:6283/api/car?mani=" + this.test3).subscribe(t => { this.result = t.json() });
  }

  Typeavailable() {
    this.test100="";
    this.bool = false;
    this.bool4 = false;
    this.bool2 = false;


    this.http.get("http://localhost:6283/api/car?b=1")
      .subscribe(t => {
        this.result4 = t.json();
        this.result = [];

      });

  }
  Type() {
    this.test100="";
    this.http.get("http://localhost:6283/api/car?t=" + this.test4).subscribe(t => { this.result = t.json() });
  }



  searchdate() {
    this.test100="";
    this.bool2 = false;
    this.bool4 = false;
    this.bool5 = false;

    this.result = [];
    this.http.get("http://localhost:6283/api/car?test1=1")
      .subscribe(t => {
        this.result = t.json()

        console.log(this.result)
      });



  }

b(){
  this.bool2=false;
  this.bool4=false;
  this.bool5=false;
  this.result=[];

}
  contains() {


debugger
    this.http.get("http://localhost:6283/api/car?containss="+this.test100)
      .subscribe(t => {
        this.result = t.json();
            });

  }
}