import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _AuthServ: AuthService
  ) { }
  loggedIn: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._AuthServ.isLoggedIn.subscribe(r => {
      this.loggedIn = r;
    });
    if (this.loggedIn === true) {
      return true;
    } else {
      this._router.navigateByUrl('auth/login');
      return false;
    }
  }

}
