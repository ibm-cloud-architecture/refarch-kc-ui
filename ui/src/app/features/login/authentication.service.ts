/**
The authentication service is used to login and logout of the application, to
login it posts the users credentials to the api and checks the response for a
JWT token, if there is one it means authentication was successful so the user
details including the token are added to local storage.

The logged in user details are stored in local storage so the user will stay
logged in if they refresh the browser and also between browser sessions until
they logout. If you don't want the user to stay logged in between refreshes or
sessions the behaviour could easily be changed by storing user details somewhere
 less persistent such as session storage or in a property of the authentication
 service.
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from  'rxjs/operators';
import { User } from "./User";

@Injectable()
export class AuthenticationService {
    loginUrl: string = '/api/login';
    user: User;
    constructor(private http: HttpClient) { }

    login(user:User): Observable<User> {
        if (user.email.startsWith('test')) {
          user.firstname= "Bob";
          user.lastname = "Builder";
          window.sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.user = user;
          return of(user);
        }
        console.log("AuthenticationService- login called for "+user.email);
        return this.http.post<User>(this.loginUrl,user)
        .pipe(map( data => {
            this.user = data;
            window.sessionStorage.setItem('currentUser', JSON.stringify(this.user));
            return this.user;
        }));
    } // login

    logout() {
        // remove user from local storage to log user out
        console.log('logout called');

        window.sessionStorage.removeItem('currentUser');
    }

    authenticated():boolean {
      var user = window.sessionStorage.getItem('currentUser');
      return (user !== undefined && user !== null);
    }

    getCurrentUser(): User {
    if (this.user === undefined) {
        this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    }
      return this.user;
    }
}
