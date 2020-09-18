import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { HomeSetLoginStateAction } from '@state/home/home.actions';
import {
  EventTypes,
  OidcSecurityService,
  PublicEventsService,
} from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shortlink-frontend';

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private store: Store<AppState>,
    private eventService: PublicEventsService
  ) {}

  checkAccount() {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      this.store.dispatch(new HomeSetLoginStateAction(isAuthenticated));
    });
  }

  ngOnInit(): void {
    this.checkAccount();
    this.eventService
      .registerForEvents()
      .pipe(
        filter(
          (notification) =>
            notification.type === EventTypes.CheckSessionReceived
        )
      )
      .subscribe((value) =>
        console.log('CheckSessionReceived with value from app', value)
      );
  }
}
