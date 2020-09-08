import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MSAL_INSTANCE } from 'src/environments/environment';
import { MsalService } from './services/msal.service';
import { MsalGuard } from './shared/guards/auth.guard';
import { MsalInterceptor } from './shared/interceptors/auth-interceptor.ts/auth-interceptor.ts.component';
import { HomeModule } from './pages/home/home.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'client-id',
      redirectUri: 'http://localhost:4200',
    },
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
