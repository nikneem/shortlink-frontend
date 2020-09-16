import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { HomeSetLoginStateAction } from '@state/home/home.actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shortlink-frontend';

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private store: Store<AppState>
  ) {}

  checkAccount() {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      this.store.dispatch(new HomeSetLoginStateAction(isAuthenticated));
    });
  }

  ngOnInit(): void {
    this.checkAccount();
  }
}
