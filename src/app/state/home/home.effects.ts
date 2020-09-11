import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ShortlinkService } from '@services/shortlink.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
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
    private router: Router
  ) {}

  @Effect()
  homePostUrl$: Observable<Action> = this.actions$.pipe(
    ofType<HomePostUrlAction>(homeActions.homePostUrl),
    debounceTime(300),
    switchMap((action) =>
      this.shortLinkService.post(action.model).pipe(
        map((resp) => new HomePostUrlCompletedAction(resp)),
        catchError((error) => of(new HomePostUrlFailedAction(error)))
      )
    )
  );
}
