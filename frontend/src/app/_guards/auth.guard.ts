import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  /* canActivate(route: ActivatedRouteSnapshot, ) */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.authService.currentUserValue;
    /* if(currentUser) {
      return true;
    } */

    if (currentUser) {


      if(currentUser.user.status != 1) {
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }


      if (next.data.roles && next.data.roles.indexOf(currentUser.user.role) === -1) {
        console.log('admin_degil');
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }


    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
