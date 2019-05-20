import { user } from './../user.model';
import { carType } from './../carType.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Car } from './../Car.model';
import { rent } from './../Rent.model';




@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']

})

export class DirectorComponent implements OnInit {

  carPhoto;
  userPhoto;
  userTypeChoose;
  userType = ['מנהל', 'עובד', 'משתמש'];

  carTypePrimaryKey: any;
  carPrinarykey: any;
  userprimarykey: any;
  rentprimarykey: any;

  result1: any;
  result2: any;
  result3: any;
  result4: any = [];
  msg: string;
  result5: any;
  result8: any;
  result10: any;



  b5: boolean;
  b6: boolean = false;
  b7: boolean = false;
  b8: boolean = false;
  b10: boolean = false;

  updatCar: Car;
  updateuser: user;
  updateRent: rent;
  updateCarType: carType;
  updateCarTypeGir: boolean;

  rs: any;
  rs1: any;
  rs2: any;
  constructor(private http: Http) { }


  ngOnInit() {

    this.reset();

  }

  reset() {
    this.updateCarType = {
      automat: true,
      DailyCost: null,
      DelayCost: null,
      Manifacturer: null,
      Type: null,
      year: null
    }

    this.updatCar = {
      Id: null,
      Type: null,
      CurrentKilometer: null,
      IsProper: true,
      IsAvailable: true,
      BranchExactLocation: null,
      Image: null
    }

    this.updateuser = {
      FullName: null,
      Id: null,
      UserName: null,
      BirthDate: null,
      Gender: null,
      Email: null,
      Password: null,
      Image: '',
      UserType: ''
    }

    this.updateRent = {
      Id: null,
      CarId: null,
      UserId: null,
      DateCarReturned: null,
      LocationEndDate: null,
      LocationStartDay: null
    }
  }



  cartype() {
    this.b6 = true;
    this.b8 = false;
    this.b7 = false;
    this.b10 = false;
    this.http.get("http://localhost:6283/api/car/updatecartype?z=3")
      .subscribe(t => {
        this.result1 = t.json()

        this.result1.forEach(element => {
          element.image = 'data:image/png;base64,' + element.image;
        });


      });
  }

  selected(ct) {
    this.reset();
    this.carTypePrimaryKey = ct.Type;
    this.updateCarType.automat = ct.automat;
    this.updateCarType.year = parseInt(ct.year);
    this.updateCarType.DelayCost = parseInt(ct.DelayCost);
    this.updateCarType.DailyCost = parseInt(ct.DailyCost);
    this.updateCarType.Manifacturer = ct.Manifacturer;
    this.updateCarType.Type = ct.Type;

  }




  update() {

    var model = new FormData();
    model.append('Type', this.updateCarType.Type);
    model.append('Manifacturer', this.updateCarType.Manifacturer);
    model.append('DailyCost', this.updateCarType.DailyCost);
    model.append('DelayCost', this.updateCarType.DelayCost);
    model.append('year', this.updateCarType.year);
    model.append('automat', this.updateCarType.automat);
    model.append('image', this.carPhoto);
    model.append('carTypePrimaryKey', this.carTypePrimaryKey);

    this.http.put("http://localhost:6283/api/car/updatecarType", model)

      .subscribe(t => {
        this.result1 = t.json()
        if (this.result1 == true) {
          this.reset();
          this.carTypePrimaryKey = "";
          this.cartype();
          window.alert("עידכון בוצע בהצלחה")
        }

        else {
          this.reset();
          this.carTypePrimaryKey = "";
          this.cartype();
          window.alert("עדכון לא בוצע נסה שנית")
        }
      });


  }

  newCarPhoto(event) {
    this.carPhoto = event.target.files[0];
  }

  userPhotoChange(event) {
    this.userPhoto = event.target.files[0];
  }

  Type1() {
    this.result4[0] = true;
    this.result4[1] = false;
  }


  delete(y) {

    this.http.delete("http://localhost:6283/api/car?pktype=" + y.Type)
      .subscribe(t => {
        this.result5 = t.json()

        if (this.result5 == true) {
          window.alert("מחיקה התבצעה בהצלחה")
          this.reset();
          this.carTypePrimaryKey = "";
          this.cartype();
        }
        else {
          window.alert("לא נמחק נסה שנית בבקשה")
        }

      });
  }

  new() {
    this.reset();
  }

  newcartype() {

    var model = new FormData();
    model.append('Type', this.updateCarType.Type);
    model.append('Manifacturer', this.updateCarType.Manifacturer);
    model.append('DailyCost', this.updateCarType.DailyCost);
    model.append('DelayCost', this.updateCarType.DelayCost);
    model.append('year', this.updateCarType.year);
    model.append('automat', this.updateCarType.automat);
    model.append('image', this.carPhoto);

    this.http.post("http://localhost:6283/api/car/AddCarType", model)

      .subscribe(t => {
        this.result1 = t.json()

        if (this.result1 == true) {
          this.reset();
          this.carTypePrimaryKey = "";
          this.cartype();
          window.alert("הוספת הרכב בוצעה בהצלחה")
        }

        else {
          this.reset();
          this.carTypePrimaryKey = "";
          this.cartype();
          window.alert("הוספת הרכב לא בוצעה. לא בוצע נסה שנית")
        }
      });
  }




  car() {
    this.b6 = false;
    this.b7 = true;
    this.b8 = false;
    this.b10 = false;

    this.http.get("http://localhost:6283/api/car/updatecartype?z1=3")
      .subscribe(t => {
        this.result2 = t.json()
      });

  }
  selected2(i) {
    this.reset();
    this.carPrinarykey = i.Id;
    this.updatCar.Id = i.Id;
    this.updatCar.Type = i.Type;
    console.log(i.Type)

    this.updatCar.IsProper = i.IsProper;
    this.updatCar.IsAvailable = i.IsAvailable;
    this.updatCar.CurrentKilometer = i.CurrentKilometer;
    this.updatCar.BranchExactLocation = i.BranchExactLocation;

  }

  updatecar() {
    this.http.put("http://localhost:6283/api/car/updatecarTyper?pk1=" + this.carPrinarykey, this.updatCar)

      .subscribe(t => {
        this.result8 = t.json()
        if (this.result8 == true) {
          this.reset();
          this.carPrinarykey = "";
          this.car();
          window.alert("עידכון בוצע בהצלחה")
        }

        else {
          this.reset();
          this.carPrinarykey = "";
          this.car();
          window.alert("עדכון לא בוצע נסה שנית")
        }
      });



  }



  deletecar(y) {

    this.http.delete("http://localhost:6283/api/car?pkcar=" + y.Id)
      .subscribe(t => {
        this.result5 = t.json()

        if (this.result5 == true) {
          window.alert("מחיקה התבצעה בהצלחה")
          this.reset();
          this.carPrinarykey = "";
          this.car();
        }
        else {
          window.alert("לא נמחק נסה שנית בבקשה")
          this.car();
        }

      });
  }


  newcar() {
    this.http.post("http://localhost:6283/api/car/AddCar", this.updatCar)

      .subscribe(t => {
        this.result1 = t.json()

        if (this.result1 == true) {
          this.reset();
          this.carPrinarykey = "";
          this.car();
          window.alert("הוספת הרכב בוצעה בהצלחה")
        }

        else {
          this.reset();
          this.carPrinarykey = "";
          this.car();
          window.alert("הוספת הרכב לא בוצעה. לא בוצע נסה שנית")
        }
      });
  }

  users() {
    this.b6 = false;
    this.b7 = false;
    this.b8 = true;
    this.b10 = false;
    this.http.get("http://localhost:6283/api/car?z11=3")
      .subscribe(t => {
        this.result3 = t.json()
   
        this.result3.forEach(element => {
          element.Picture = 'data:image/png;base64,' + element.Picture;
        });

      });

  }


  selected3(i) {
    this.reset();
    this.userprimarykey = i.Id;

    this.updateuser.Id = i.Id;

    this.updateuser.FullName = i.FullName;

    this.updateuser.UserName = i.UserName;

    let date = new Date(i.BirthDate);
    date.setDate(date.getDate() + 1);
    this.updateuser.BirthDate = date.toISOString().split('T')[0];
    this.updateuser.Gender = i.Gender;
    this.updateuser.Email = i.Email;
    this.updateuser.Password = i.Password;
  }




  updateuserf() {
     debugger;
    var model = new FormData();
    model.append('Id', this.updateuser.Id);
    model.append('BirthDate', this.updateuser.BirthDate);
    model.append('Email', this.updateuser.Email);
    model.append('FullName', this.updateuser.FullName);
    model.append('Gender', this.updateuser.Gender);
    model.append('Picture', this.userPhoto);
    model.append('Password', this.updateuser.Password);
    model.append('UserName', this.updateuser.UserName);
    model.append('UserType', this.updateuser.UserType);
    model.append('pk100', this.userprimarykey);

    this.http.put("http://localhost:6283/api/car/updateuser", model)

      .subscribe(t => {
        this.userPhoto = null;

        this.result8 = t.json()
        if (this.result8 == true) {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("עידכון בוצע בהצלחה")
        }

        else {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("עדכון לא בוצע נסה שנית")
        }
      });
  }




  deleteuser(y) {

    this.http.delete("http://localhost:6283/api/car?pkuser=" + y.Id)
      .subscribe(t => {
        this.result5 = t.json()

        if (this.result5 == true) {
          window.alert("מחיקה התבצעה בהצלחה")
          this.reset();
          this.userprimarykey = "";
          this.users();
        }
        else {
          window.alert("לא נמחק נסה שנית בבקשה")
          this.users();
        }

      });
  }




  newuser() {
    var model = new FormData();
    model.append('BirthDate', this.updateuser.BirthDate);
    model.append('Email', this.updateuser.Email);
    model.append('FullName', this.updateuser.FullName);
    model.append('Gender', this.updateuser.Gender);
    model.append('Id', this.updateuser.Id);
    model.append('Image', this.userPhoto);
    model.append('Password', this.updateuser.Password);
    model.append('UserName', this.updateuser.UserName);
    model.append('UserType', this.userTypeChoose);

    this.http.post("http://localhost:6283/api/car/Adduser", model)

      .subscribe(t => {
        this.result1 = t.json()
        this.userPhoto = null;

        if (this.result1 == true) {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("הוספת משתמש בוצעה בהצלחה")
        }

        else {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("הוספת משתמש לא בוצעה.  נסה שנית")
        }
      });
  }

  rents() {
    this.b10 = true;
    this.b6 = false;
    this.b7 = false;
    this.b8 = false;


    this.http.get("http://localhost:6283/api/car/getlocation?z111=1")
      .subscribe(t => {
        this.result10 = t.json()
      });

  }


  selected4(i) {
    this.reset();
    this.rentprimarykey = i.Id;

    this.updateRent.Id = i.Id;

    this.updateRent.CarId = i.CarId;

    debugger;
    let DateCarReturned = i.DateCarReturned ? new Date(i.DateCarReturned) : null;
    let LocationEndDate = new Date(i.LocationEndDate);
    let LocationStartDay = new Date(i.LocationStartDay);

    if (DateCarReturned) {
      DateCarReturned.setDate(DateCarReturned.getDate() + 1);
      this.updateRent.DateCarReturned = DateCarReturned.toISOString().split('T')[0];
    } else {
      this.updateRent.DateCarReturned = null;
    }
    LocationEndDate.setDate(LocationEndDate.getDate() + 1);
    LocationStartDay.setDate(LocationStartDay.getDate() + 1);

    this.updateRent.LocationEndDate = LocationEndDate.toISOString().split('T')[0];
    this.updateRent.LocationStartDay = LocationStartDay.toISOString().split('T')[0];

    this.updateRent.UserId = i.UserId;
  }

  rentupdate() {
    this.http.put("http://localhost:6283/api/car/updatelocation?pk1000=" + this.rentprimarykey, this.updateRent)

      .subscribe(t => {
        this.result8 = t.json()
        if (this.result8 == true) {
          this.reset();
          this.rentprimarykey = "";
          this.rents();
          window.alert("עידכון בוצע בהצלחה")
        }

        else {
          this.reset();
          this.rentprimarykey = "";
          this.rents();
          window.alert("עדכון לא בוצע נסה שנית")
        }
      });


  }

  deleterent(y) {
    this.http.delete("http://localhost:6283/api/car?pkrent=" + y.Id)
      .subscribe(t => {
        this.result5 = t.json()

        if (this.result5 == true) {
          window.alert("מחיקה התבצעה בהצלחה")
          this.reset();
          this.rentprimarykey = "";
          this.rents();
        }
        else {
          window.alert("לא נמחק נסה שנית בבקשה")
          this.rents();
        }

      });
  }


  newRent1() {
    this.http.post("http://localhost:6283/api/car/Adduser", this.updateuser)

      .subscribe(t => {
        this.result1 = t.json()

        if (this.result1 == true) {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("הוספת משתמש בוצעה בהצלחה")
        }

        else {
          this.reset();
          this.userprimarykey = "";
          this.users();
          window.alert("הוספת משתמש לא בוצעה.  נסה שנית")
        }
      });
  }

  Type3() {

    this.http.get("http://localhost:6283/api/car?b=1").subscribe(t => { this.rs = t.json() });
    console.log(this.rs);
  }


  userid() {

    this.http.get("http://localhost:6283/api/car/getuserid?k3=1").subscribe(t => { this.rs1 = t.json() });
    console.log(this.rs);
  }

  caridd() {

    this.http.get("http://localhost:6283/api/car/getidcar?k333=1").subscribe(t => { this.rs2 = t.json() });
    console.log(this.rs);
  }
}
