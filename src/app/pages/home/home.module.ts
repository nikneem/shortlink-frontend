import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { LoggedOutPageComponent } from './logged-out-page/logged-out-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomePageComponent, AuthPageComponent, UnauthorizedPageComponent, LoggedOutPageComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, TranslateModule],
})
export class HomeModule {}
