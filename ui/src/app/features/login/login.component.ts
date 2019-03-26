import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "./authentication.service";
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  returnUrl: string;
  errorMessage: string;
  loggingIn: boolean;

  constructor(private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(){
      this.errorMessage = '' // clear error on begin login
      this.loggingIn = true;
      this.authenticationService.login(this.user)
          .subscribe(
              data => {
                  this.loggingIn = true;
                  this.user=data;
                  this.router.navigate([this.returnUrl]);
                },
              error => {
                  this.loggingIn = false;
                  this.errorMessage = `${error.status}: ${error.statusText}`
                  this.authenticationService.logout();
                  this.router.navigate(['/']);
                });

  }

  logout(){
    this.loggingIn = false;
    this.authenticationService.logout();
  }
}
