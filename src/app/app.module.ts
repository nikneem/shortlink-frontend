import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment, MSAL_INSTANCE } from 'src/environments/environment';
import { MsalService } from './services/msal.service';
import { MsalGuard } from './shared/guards/auth.guard';
import { MsalInterceptor } from './shared/interceptors/auth-interceptor.ts/auth-interceptor.ts.component';
import { HomeModule } from './pages/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* NGRX / Redux */
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { reducers, INITIAL_APPSTATE } from '@state/app.state';
import { HomeEffects } from '@state/home/home.effects';

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '3c62e326-4f03-4b68-8190-88b2a3603894',
      redirectUri: 'http://localhost:4200',
    },
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
    MsalGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
