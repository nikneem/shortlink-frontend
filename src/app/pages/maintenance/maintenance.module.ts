import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceListPageComponent } from './maintenance-list-page/maintenance-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceListEffects } from '@state/maintenance-list/maintenance-list.effects';
import { MaintenanceDetailsPageComponent } from './maintenance-details-page/maintenance-details-page.component';
import { MaintenanceDetailsEffects } from '@state/maintenance-details/maintenance-details.effects';

@NgModule({
  declarations: [MaintenanceListPageComponent, MaintenanceDetailsPageComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      MaintenanceListEffects,
      MaintenanceDetailsEffects,
    ]),
  ],
})
export class MaintenanceModule {}
