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
import { MaintenanceModule } from '@pages/maintenance/maintenance.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function loadConfig(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://login.microsoftonline.com/common/v2.0',
      redirectUrl: `${window.location.origin}/auth`,
      postLoginRoute: `${window.location.origin}/auth`,
      postLogoutRedirectUri: `${window.location.origin}/logged-off`,
      clientId: '5e039917-1ed1-4706-bd47-1f1608c10e09',
      scope:
        'openid profile email offline_access api://5e039917-1ed1-4706-bd47-1f1608c10e09/shortlinks:maintenance',
      responseType: 'code',
      silentRenew: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: true,
      autoUserinfo: false,
      silentRenewUrl: `${window.location.origin}/silent-renew.html`,
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
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    MaintenanceModule,
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
