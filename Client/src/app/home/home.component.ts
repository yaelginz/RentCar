import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { StatiService } from '../stati.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { user } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


  userTypeChoose;
  userType = ['מנהל', 'עובד', 'משתמש'];
  updateuser: user;
  userPhoto;

  userForm = {
    userType: '',
    userName: '',
    password: ''
  };

  user = null;
  showErrorMessage = null;
  showSuccessMessage = null;

  @ViewChild('loginFormModal') loginFormModal: ModalDirective;

  constructor(
    private router: Router,
    private http: Http,
    private staticService: StatiService
  ) { }

  ngOnInit() {

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

  }

  userPhotoChange(event) {
    this.userPhoto = event.target.files[0];
  }

  loginUser(val) {
    console.log(val);
    this.http.get(`http://localhost:6283/api/user?userName=${val.userName}&password=${val.password}&userType=${val.userType}`)
      .subscribe(item => {
        // this.userService. = item;

        if (JSON.parse(item['_body']) !== null) {
          this.showSuccessMessage = true;
          debugger;
          this.user = JSON.parse(item['_body']);
          this.user.UserType = this.user.UserType.replace(/\s/g, '') ;
          this.staticService.initUserLogedIn(this.user);
          switch (this.user.UserType) {
            case 'מנהל':
              this.router.navigate(['director']);
              break;
            case 'עובד':
              this.router.navigate(['worker']);
              break;
            case 'משתמש':
              this.router.navigate(['search']);
              break;
            default:
              break;
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
          console.log(this.user)
          this.staticService.initUserLogedIn(JSON.parse(item['_body']))
          setTimeout(() => {
            this.loginFormModal.hide();
          }, 300);
        } else {
          this.user = null;
          this.showErrorMessage = true;
        }
      })
  }

  hideModal(){
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
        this.userPhoto = null;

        if (t.json() == true) {
          window.alert("הוספת משתמש בוצעה בהצלחה")
        }
        else {
          window.alert("הוספת משתמש לא בוצעה.  נסה שנית")
        }
      });
  }

  loginAsGuest() {
    this.staticService.initUserLogedIn('אורח');
    this.router.navigate(['search']);
  }
}
