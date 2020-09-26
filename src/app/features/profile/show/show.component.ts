import { AuthService } from 'src/app/core/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, OnDestroy {

  constructor(

    private _hs: HelperService,
    private _as: AuthService

    ) { }
  ngOnDestroy(): void {
    this.profile = {}
  }

  profile: any;

  ngOnInit() {
    this.profile = this._as.userInfo.value;
  }

  goto(e){
    this._hs.goTo(e)
  }

}
