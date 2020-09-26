import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router) { }

  goTo(e: string) {
    this._router.navigateByUrl(e);
  }
}
