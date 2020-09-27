import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceListPageComponent } from './maintenance-list-page/maintenance-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { MaintenanceListEffects } from '@state/maintenance-list/maintenance-list.effects';
import { MaintenanceDetailsPageComponent } from './maintenance-details-page/maintenance-details-page.component';
import { MaintenanceDetailsEffects } from '@state/maintenance-details/maintenance-details.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceHitsComponent } from './maintenance-hits/maintenance-hits.component';

@NgModule({
  declarations: [MaintenanceListPageComponent, MaintenanceDetailsPageComponent, MaintenanceHitsComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      MaintenanceListEffects,
      MaintenanceDetailsEffects,
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MaintenanceModule {}
