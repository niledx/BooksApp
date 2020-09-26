import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    // tslint:disable-next-line: variable-name
    private _HelpServ: HelperService
  ) { }

  user = '';
  pass = '';
  error$: string;
  error = '';
  ngOnInit() {
  }

  Login() {
    if (this.user != '' && this.pass != '') {
      const User = {
        user: this.user,
        pass: this.pass
      };
      this.authService.LogMeIn(User);
      this.error$ = this.authService.login_error.value;
    } else {
      this.error = 'One of the field is empty';
      setTimeout(() => {
        this.error = '';
      }, 1500);
    }
  }

  goTo(e) {
    this._HelpServ.goTo(e);
  }
}
