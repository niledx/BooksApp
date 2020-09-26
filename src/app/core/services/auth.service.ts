import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // tslint:disable: variable-name
    private _http: HttpClient,
    private _router: Router
  ) { }
  LoginStatus = new BehaviorSubject<boolean>(false);
  userName = new BehaviorSubject<string>('');
  _user = new BehaviorSubject<string>('');
  login_error = new BehaviorSubject<string>('');
  userInfo = new BehaviorSubject<any>(null);

  loginURL = 'http://localhost:8080/login';

  get isLoggedIn() {
    return this.LoginStatus.asObservable();
  }

  get name() {
    return this.userName.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }
  get loginError() {
    return this.login_error.asObservable();
  }

  LogMeIn(obj: any) {
    return this._http.post(this.loginURL, obj).subscribe((r: any) => {
      if (r.data === true) {
        this._user.next(r.user);
        this.userName.next(r.name);
        this.userInfo.next(r)
        this.LoginStatus.next(r.data);
        this._router.navigateByUrl('dashboard');
      } else {
        this.login_error.next('Wrong Credentials!');
      }
    });
  }

  updateData(Obj) {
    this.userName.next(Obj.name)
    this.userInfo.next(Obj);
  }

}
