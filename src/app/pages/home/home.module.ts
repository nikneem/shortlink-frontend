import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';

@NgModule({
  declarations: [HomePageComponent, AuthPageComponent, UnauthorizedPageComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
