import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
