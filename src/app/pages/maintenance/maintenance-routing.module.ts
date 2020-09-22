import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from 'src/app/shared/guards/auth.guard';
import { MaintenanceTemplateComponent } from 'src/app/shared/templates/maintenance-template/maintenance-template.component';
import { MaintenanceDetailsPageComponent } from './maintenance-details-page/maintenance-details-page.component';
import { MaintenanceListPageComponent } from './maintenance-list-page/maintenance-list-page.component';

const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenanceTemplateComponent,
    canActivate: [AuthorizationGuard],
    children: [
      { path: '', component: MaintenanceListPageComponent },
      { path: ':id', component: MaintenanceDetailsPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
