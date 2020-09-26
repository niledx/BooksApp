import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private _AuthS: AuthService,
    private _http: HttpClient
  ) { }

  user: string;
  books = [];

  ngOnInit() {
    this.user = this._AuthS._user.value;
    this._http.get('http://localhost:8080/books/view?name='+this.user).subscribe((r: any) => {
      this.books = r;
    })
  }

}
