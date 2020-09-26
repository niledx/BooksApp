import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _http: HttpClient) { }

  books = [];

  ngOnInit() {
    this._http.get('http://localhost:8080/books/view').subscribe((r: any) => {
      this.books = r;
    })
  }

}
