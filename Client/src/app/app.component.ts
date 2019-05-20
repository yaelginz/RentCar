
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { StatiService } from 'src/app/stati.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {


  arr: any;

  user = null;
  showErrorMessage = null;
  showSuccessMessage = null;


  @ViewChild('loginFormModal') loginFormModal: ModalDirective;
  @ViewChild('loginForm') form: NgForm;

  userType = ['מנהל', 'עובד', 'משתמש', 'אורח'];
  userForm = {
    userType: '',
    userName: '',
    password: ''
  };

  constructor(private http: Http, private staticService: StatiService, private router: Router) {

  }
  switchUser(){
    this.router.navigate(['']);
    this.user = null;
    this.showErrorMessage = null;
    this.showSuccessMessage = null;
    this.ngAfterViewInit();
  }

  loginUser(val) {
    console.log(val);
    this.http.get(`http://localhost:6283/api/user?userName=${val.userName}&password=${val.password}&userType=${val.userType}`)
      .subscribe(item => {
        // this.userService. = item;

        if (JSON.parse(item['_body']) !== null) {
          this.showSuccessMessage = true;
          this.user = JSON.parse(item['_body']);
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
            // case 'אורח':
            //   this.router.navigate(['search']);
            //   break;

            default:
              break;
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


  
  ngOnInit() {
    localStorage.CarType = '';

    this.router.navigate(['HomePage'])
    // console.log(this.form.value);
    // console.log(this.loginFormModal);
    this.a();
  }

  ngAfterViewInit(): void {
    // this.form.reset();
    // this.loginFormModal.show();
  }


  a() {
    this.http.get("http://localhost:6283/api/car?z11=3")
      .subscribe(t => {
        this.arr = t.json()
      });


  }


}
