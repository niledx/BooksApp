import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {



  // tslint:disable-next-line: variable-name
  constructor(private _as: AuthService, private _router: Router, private _HelpServ: HelperService) { }
  status$: Observable<any>;
  user$: Observable<string>;

  ngOnInit() {
    this.status$ = this._as.isLoggedIn;
    this.user$ = this._as.name;

  }

  goTo(e) {
    this._HelpServ.goTo(e);
  }

  logout() {
    this._as.LoginStatus.next(false);
    this._as._user.next('');
    this._as.userName.next('');
    this._as.login_error.next('');
    this._router.navigateByUrl('home');
  }

}
