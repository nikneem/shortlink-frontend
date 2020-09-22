import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [TitleComponent, LoadingComponent],
  imports: [CommonModule],
  exports: [TitleComponent, LoadingComponent],
})
export class ComponentsModule {}
