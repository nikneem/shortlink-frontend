import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LoadingComponent } from './loading/loading.component';
import { HourlyChartComponent } from './hourly-chart/hourly-chart.component';
import { DailyChartComponent } from './daily-chart/daily-chart.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TitleComponent,
    LoadingComponent,
    HourlyChartComponent,
    DailyChartComponent,
    DeleteConfirmationComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [
    TitleComponent,
    LoadingComponent,
    HourlyChartComponent,
    DailyChartComponent,
  ],
  entryComponents: [DeleteConfirmationComponent]
})
export class ComponentsModule {}
