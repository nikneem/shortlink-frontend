import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  constructor(private router: Router, private oidc: OidcSecurityService) {}

  handleLoginRedirect() {
    // this.oidc.checkAuth().subscribe((val) => {
    //   if (val) {
    //     this.router.navigate(['/home']);
    //   }
    // });
  }

  ngOnInit(): void {
    //this.handleLoginRedirect();
  }
}
