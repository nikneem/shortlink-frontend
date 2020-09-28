import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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
    private eventService: PublicEventsService,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'nl']);
    const preferredLanguage = this.preferredLanguage();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(preferredLanguage);
  }

  checkAccount() {
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      this.store.dispatch(new HomeSetLoginStateAction(isAuthenticated));
      if (isAuthenticated) {
        if (this.router.url.startsWith('/auth?code=')) {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  private preferredLanguage(): string {
    const languageSetting = localStorage.getItem('language');
    if (languageSetting) {
      const languageIndex = this.translate.langs.indexOf(languageSetting);
      if (languageIndex >= 0) {
        return languageSetting;
      }
    }

    let browserLanguage = this.translate.langs[0];
    window.navigator.languages.some((val) => {
      const languageIndex = this.translate.langs.indexOf(val);
      if (languageIndex >= 0) {
        browserLanguage = val;
        return true;
      }
    });

    return browserLanguage;
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
