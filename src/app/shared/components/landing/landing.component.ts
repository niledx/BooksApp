import { HelperService } from 'src/app/shared/services/helper.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    // tslint:disable: variable-name
    private _as: AuthService,
    private _hs: HelperService
  ) { }

  status$: Observable<any>;

  ngOnInit() {
    this.status$ = this._as.isLoggedIn;
  }

  goto(e) {
    this._hs.goTo(e);
  }

}
