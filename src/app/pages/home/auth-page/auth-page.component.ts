import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  constructor() {}

  handleLoginRedirect() {
    // this.authService.handleRedirectObservable().pipe(
    //   map((resp) => {
    //     debugger;
    //     console.log(resp.accessToken);
    //   }),
    //   catchError((error) => {
    //     debugger;
    //     return of(console.log(error));
    //   })
    // );
    //  ndleRedirectPromise().then(tokenResponse =>{
    //   console.log("Token response")
    //   console.log(tokenResponse);
    //   if (tokenResponse === null && publicClientApplication.getAllAccounts() === null) {
    //     publicClientApplication.loginRedirect({
    //       scopes: [],
    //       redirectUri: msalConfig.auth.redirectUri,
    //     })
    //   }
    // }).catch(error => {
    //   console.log("handle redirect promise error")
    //   console.error(error);
    // });
  }

  ngOnInit(): void {
    this.handleLoginRedirect();
  }
}
