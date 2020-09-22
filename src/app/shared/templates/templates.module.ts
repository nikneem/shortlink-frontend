import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceTemplateComponent } from './maintenance-template/maintenance-template.component';
import { RouterModule } from '@angular/router';
import { MaintenanceTemplateCrumbleComponent } from './maintenance-template-crumble/maintenance-template-crumble.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MaintenanceTemplateComponent,
    MaintenanceTemplateCrumbleComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class TemplatesModule {}
