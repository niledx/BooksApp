import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private _AuthS: AuthService,
    private _http: HttpClient,
    private _router: Router
  ) { }

  bookName = '';
  imgURL = '';
  name: string;
  addAPI = 'http://localhost:8080/books/add';
  error = '';
  user: string;

  ngOnInit() {
    this.name = this._AuthS.userName.value;
    this.user =this._AuthS._user.value;
  }

  addBook(){
    const data = {
      name: this.name,
      user: this.user,
      bookName : this.bookName,
      imgURL : this.imgURL
    }

    this._http.post(this.addAPI, data).subscribe((r: any) => {
      if(r.status===true){
        this.name = '';
        this.bookName = '';
        this.imgURL = '';
        this._router.navigateByUrl('dashboard');
      } else {
        this.error = 'Error adding book currently, try again later!'
      }
    })
  }

}
