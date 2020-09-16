import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HomeModule } from './pages/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AuthModule,
  LogLevel,
  OidcConfigService,
  OidcSecurityService,
} from 'angular-auth-oidc-client';

/* NGRX / Redux */
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { reducers, INITIAL_APPSTATE } from '@state/app.state';
import { HomeEffects } from '@state/home/home.effects';
import { AuthorizationGuard } from './shared/guards/auth.guard';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer:
        'https://login.microsoftonline.com/7ff95b15-dc21-4ba6-bc92-824856578fc1/v2.0',
      authWellknownEndpoint: 'https://login.microsoftonline.com/common/v2.0',
      redirectUrl: `${window.location.origin}/auth`,
      clientId: '3c62e326-4f03-4b68-8190-88b2a3603894',
      scope:
        'openid profile email api://3c62e326-4f03-4b68-8190-88b2a3603894/shortlinks:maintenance',
      responseType: 'code',
      silentRenew: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: true,
      autoUserinfo: false,
      silentRenewUrl: window.location.origin + '/silent-renew.html',
      // customParams: {
      //     response_mode: 'fragment',
      //     prompt: 'consent',
      // },
    });
}

let metaReducers = [];
if (environment.production === false) {
  metaReducers = [storeFreeze];
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/translations/');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: INITIAL_APPSTATE,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
    EffectsModule.forRoot([HomeEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AuthModule.forRoot(),
  ],
  providers: [
    OidcSecurityService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true,
    },
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
