import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateNewShortLinkDto,
  ShortLinkDetailsDto,
} from '@state/home/home.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShortlinkService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  public post(dto: CreateNewShortLinkDto): Observable<ShortLinkDetailsDto> {
    var url = `${this.baseUrl}/api/shortlinks`;
    return this.http.post<ShortLinkDetailsDto>(url, dto);
  }
}
