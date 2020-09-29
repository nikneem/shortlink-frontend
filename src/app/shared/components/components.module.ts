import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { LoadingComponent } from './loading/loading.component';
import { HourlyChartComponent } from './hourly-chart/hourly-chart.component';
import { DailyChartComponent } from './daily-chart/daily-chart.component';

@NgModule({
  declarations: [
    TitleComponent,
    LoadingComponent,
    HourlyChartComponent,
    DailyChartComponent,
  ],
  imports: [CommonModule],
  exports: [
    TitleComponent,
    LoadingComponent,
    HourlyChartComponent,
    DailyChartComponent,
  ],
})
export class ComponentsModule {}
