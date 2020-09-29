import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DailyHitsDto,
  HourlyHitsDto,
} from '@state/maintenance-details/maintenance-details.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  public getHourlyHits(shortCode: string): Observable<Array<HourlyHitsDto>> {
    var url = `${this.baseUrl}/api/charts/${shortCode}/hourly`;
    return this.http.get<Array<HourlyHitsDto>>(url);
  }

  public getDailyHits(shortCode: string): Observable<Array<DailyHitsDto>> {
    var url = `${this.baseUrl}/api/charts/${shortCode}/daily`;
    return this.http.get<Array<DailyHitsDto>>(url);
  }

  public getSparkLineHits(shortCode: string): Observable<Array<HourlyHitsDto>> {
    var url = `${this.baseUrl}/api/charts/${shortCode}/sparkline`;
    return this.http.get<Array<HourlyHitsDto>>(url);
  }
}
