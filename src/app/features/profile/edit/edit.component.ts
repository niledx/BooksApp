import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  updateAPI = 'http://localhost:8080/profile/edit';

  constructor(private _hs: HelperService, private _as: AuthService, private _router: Router, private _http: HttpClient) { }

  profile: any;
  name = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  error = '';

  ngOnInit() {
    this.profile = this._as.userInfo.value;
  }

  goto(e) {
    this._hs.goTo(e)
  }

  edit() {
    const newUserDetails = {
      _id: this.profile.id,
      name: this.name !== '' ? this.name : this.profile.name,
      email: this.email !== '' ? this.email : this.profile.email,
      phone: this.phone !== '' ? this.phone : this.profile.phone,
      city: this.city !== '' ? this.city : this.profile.city,
      state: this.state !== '' ? this.state : this.profile.state
    }

    this._http.post(this.updateAPI, newUserDetails).subscribe((r: any) => {
      if (r.status === true) {
        this._as.updateData(r.updatedData)
        this._router.navigateByUrl('profile/show')
      } else {
        this.error = 'Something went wrong!';
      }
    })

  }

}
