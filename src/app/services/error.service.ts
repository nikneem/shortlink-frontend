import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorCodeDto } from '../shared/models/error-code';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private translate: TranslateService) {}

  getErrorMessage(dto: ErrorCodeDto[]): Observable<Array<string>> {
    let translationKeys = dto.map((err) => err.translationKey);
    return this.translate.get(translationKeys).pipe(
      map((values) => {
        return Object.keys(values).map((key) => values[key]);
      })
    );
  }
}
