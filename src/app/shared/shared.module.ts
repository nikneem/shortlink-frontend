import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, MaterialModule, TemplatesModule],
  exports: [ComponentsModule, MaterialModule, TemplatesModule],
})
export class SharedModule {}
