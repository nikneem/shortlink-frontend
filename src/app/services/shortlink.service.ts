import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateNewShortLinkDto,
  ShortLinkDetailsDto,
} from '@state/home/home.models';
import { ShortLinkListItemDto } from '@state/maintenance-list/maintenance-list.models';
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

  public list(
    page: number,
    pageSize: number
  ): Observable<Array<ShortLinkListItemDto>> {
    var url = `${this.baseUrl}/api/shortlinks?page=${page}&pageSize=${pageSize}`;
    return this.http.get<Array<ShortLinkListItemDto>>(url);
  }

  public get(id: string): Observable<ShortLinkDetailsDto> {
    var url = `${this.baseUrl}/api/shortlink/${id}`;
    return this.http.get<ShortLinkDetailsDto>(url);
  }

  public post(dto: CreateNewShortLinkDto): Observable<ShortLinkDetailsDto> {
    var url = `${this.baseUrl}/api/shortlinks`;
    return this.http.post<ShortLinkDetailsDto>(url, dto);
  }
}
