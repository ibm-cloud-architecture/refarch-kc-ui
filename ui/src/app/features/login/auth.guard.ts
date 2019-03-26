/**
The auth guard is used to prevent unauthenticated users from accessing restricted routes. Once
a user is logged in, the user information is persisted in a local storage. So the guard verifies
is the user is present or not.
The mechanism use the router to route to the log, but keep the URL entered by the user to navigate to it
once the user is logged in.
*/
﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
      if (! this.authService.authenticated()) {
        this.router.navigate(['log'], { queryParams: { returnUrl: state.url } });
      }

      return true;
    }
}
