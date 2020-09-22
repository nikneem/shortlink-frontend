import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { HomePostUrlAction } from '@state/home/home.actions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  loggedIn = false;
  endpointUrl: string;
  private latestLinkSubscription: Subscription;

  latestLink: string;
  isLoading: boolean;

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    this.endpointUrl = pastedText;
    // event.stopPropagation();
    // this.createNewShortLink(this.endpointUrl);
    //    alert(this.endpointUrl);
  }
  onEnter(event: any) {
    this.createNewShortLink(this.endpointUrl);
  }
  addLink() {
    this.createNewShortLink(this.endpointUrl);
  }

  createNewShortLink(endpoint: string) {
    this.store.dispatch(new HomePostUrlAction(endpoint));
  }

  navigateMaintenance() {
    this.router.navigate(['/maintenance']);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoffLocal();
    //    this.oidcSecurityService.logoff();
  }

  ngOnInit(): void {
    this.latestLinkSubscription = this.store
      .select((str) => str.homeState.isLoggedOn)
      .subscribe((val) => {
        this.loggedIn = val;
      });

    this.latestLinkSubscription = this.store
      .select((str) => str.homeState.latestShortLinkUrl)
      .subscribe((val) => (this.latestLink = val));
    this.latestLinkSubscription = this.store
      .select((str) => str.homeState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }
  ngOnDestroy(): void {
    this.latestLinkSubscription.unsubscribe();
  }
}
