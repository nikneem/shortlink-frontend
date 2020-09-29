import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  ChartPointDto,
  DailyHitsDto,
} from '@state/maintenance-details/maintenance-details.models';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
})
export class DailyChartComponent implements OnInit, OnDestroy {
  private dailyChartDataSubscription: Subscription;
  private chartData: Array<DailyHitsDto>;

  private chartLabels: Array<string>;
  private chartDataPoints = [];
  chart = [];

  @ViewChild('dailychart') chartElement: ElementRef;

  constructor(private store: Store<AppState>) {}

  private prepareChartData() {
    if (this.chartData) {
      this.chartLabels = this.chartData.map((err) => {
        let date = new Date(err.start);
        return date.toLocaleDateString();
      });
      this.chartDataPoints = this.chartData.map(
        (err) =>
          new ChartPointDto({
            x: new Date(err.start).toLocaleDateString(),
            y: err.hits,
          })
      );
      this.constructChart();
    }
  }

  private constructChart() {
    const ctx = document.getElementById(this.chartElement.nativeElement);

    this.chart = new Chart(this.chartElement.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Hits',
            data: this.chartDataPoints,
            borderColor: ['rgba(255, 255, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  ngOnInit(): void {
    this.dailyChartDataSubscription = this.store
      .select((str) => str.maintenanceDetailsState.dailyHits)
      .subscribe((val) => {
        this.chartData = val;
        this.prepareChartData();
      });
  }
  ngOnDestroy(): void {
    this.dailyChartDataSubscription.unsubscribe();
  }
}
