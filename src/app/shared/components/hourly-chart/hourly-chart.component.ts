import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  ChartPointDto,
  HourlyHitsDto,
} from '@state/maintenance-details/maintenance-details.models';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  styleUrls: ['./hourly-chart.component.scss'],
})
export class HourlyChartComponent implements OnInit, OnDestroy {
  private hourlyChartDataSubscription: Subscription;
  private chartData: Array<HourlyHitsDto>;

  private chartLabels: Array<string>;
  private chartDataPoints = [];
  chart = [];

  @ViewChild('hourlychart') chartElement: ElementRef;

  constructor(private store: Store<AppState>) {}

  private prepareChartData() {
    if (this.chartData) {
      this.chartLabels = this.chartData.map((err) => {
        let date = new Date(err.start);
        return date.toTimeString();
      });
      this.chartDataPoints = this.chartData.map(
        (err) => new ChartPointDto({ x: err.hour, y: err.hits })
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
    this.hourlyChartDataSubscription = this.store
      .select((str) => str.maintenanceDetailsState.hourlyHits)
      .subscribe((val) => {
        this.chartData = val;
        this.prepareChartData();
      });
  }
  ngOnDestroy(): void {
    this.hourlyChartDataSubscription.unsubscribe();
  }
}
