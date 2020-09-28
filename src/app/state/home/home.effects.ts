import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ErrorService } from '@services/error.service';
import { ShortlinkService } from '@services/shortlink.service';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  flatMap,
  map,
  switchMap,
} from 'rxjs/operators';
import { ErrorCodeDto } from 'src/app/shared/models/error-code';
import {
  homeActions,
  HomePostUrlAction,
  HomePostUrlCompletedAction,
  HomePostUrlFailedAction,
} from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private shortLinkService: ShortlinkService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  @Effect()
  homePostUrl$: Observable<Action> = this.actions$.pipe(
    ofType<HomePostUrlAction>(homeActions.homePostUrl),
    debounceTime(300),
    switchMap((action) =>
      this.shortLinkService.post(action.model).pipe(
        map((resp) => new HomePostUrlCompletedAction(resp)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            const dto: ErrorCodeDto[] = error.error;
            return this.errorService
              .getErrorMessage(dto)
              .pipe(flatMap((msg) => of(new HomePostUrlFailedAction(msg))));
          }
          return of(new HomePostUrlFailedAction([error.message]));
        })
      )
    )
  );
}
