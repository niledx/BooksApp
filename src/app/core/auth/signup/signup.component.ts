import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router) { }

  signupAPI = 'http://localhost:8080/signup';

  name = '';
  user = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  pass = '';

  error$ = '';

  ngOnInit() {
  }

  signUp() {
    const userDetails = {
      name: this.name,
      user: this.user,
      email: this.email,
      phone: this.phone,
      city: this.city,
      state: this.state,
      password: this.pass
    }

    this._http.post(this.signupAPI, userDetails).subscribe((r: any) => {
      if (r.status === true) {
        this.error$ = 'You have been registered! You will be redirected to Login page in 3 seconds';
        setTimeout(() => {
          this._router.navigateByUrl('auth/login')
        }, 3000);
      } else {
        this.error$ = 'There was a problem registering you!';
      }
    })

  }

}
