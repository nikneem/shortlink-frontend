import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { HomePostUrlAction } from '@state/home/home.actions';
import { Subscription } from 'rxjs';
import { MsalService } from 'src/app/services/msal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  loggedIn = false;
  private latestLinkSubscription: Subscription;

  latestLink: string;
  isLoading: boolean;

  constructor(
    private authService: MsalService,
    private store: Store<AppState>
  ) {}

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    this.store.dispatch(new HomePostUrlAction(pastedText));
  }

  checkAccount() {
    this.loggedIn = this.authService.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginPopup().subscribe(() => this.checkAccount());
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    //    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();
    this.latestLinkSubscription = this.store
      .select((str) => str.homeState.latestShortLinkUrk)
      .subscribe((val) => (this.latestLink = val));
  }
  ngOnDestroy(): void {
    this.latestLinkSubscription.unsubscribe();
  }
}
