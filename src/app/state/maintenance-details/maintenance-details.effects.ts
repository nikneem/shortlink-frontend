import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ShortlinkService } from '@services/shortlink.service';
import {
  HomePostUrlAction,
  homeActions,
  HomePostUrlCompletedAction,
  HomePostUrlFailedAction,
} from '@state/home/home.actions';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import {
  maintenanceDetailsActions,
  MaintenanceDetailsGetDetails,
  MaintenanceDetailsGetDetailsComplete,
  MaintenanceDetailsGetDetailsFailed,
} from './maintenance-details.actions';

@Injectable()
export class MaintenanceDetailsEffects {
  constructor(
    private actions$: Actions,
    private shortLinkService: ShortlinkService,
    private router: Router
  ) {}

  @Effect()
  getDetails$: Observable<Action> = this.actions$.pipe(
    ofType<MaintenanceDetailsGetDetails>(maintenanceDetailsActions.getDetails),
    debounceTime(300),
    switchMap((action) =>
      this.shortLinkService.get(action.id).pipe(
        map((resp) => new MaintenanceDetailsGetDetailsComplete(resp)),
        catchError((error) => of(new MaintenanceDetailsGetDetailsFailed(error)))
      )
    )
  );
}
