import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ChartsService } from '@services/charts.service';
import { ShortlinkService } from '@services/shortlink.service';
import {
  HomePostUrlAction,
  homeActions,
  HomePostUrlCompletedAction,
  HomePostUrlFailedAction,
} from '@state/home/home.actions';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  maintenanceDetailsActions,
  MaintenanceDetailsGetDailyHits,
  MaintenanceDetailsGetDailyHitsComplete,
  MaintenanceDetailsGetDailyHitsFailed,
  MaintenanceDetailsGetDetails,
  MaintenanceDetailsGetDetailsComplete,
  MaintenanceDetailsGetDetailsFailed,
  MaintenanceDetailsGetHourlyHits,
  MaintenanceDetailsGetHourlyHitsComplete,
  MaintenanceDetailsGetHourlyHitsFailed,
  MaintenanceDetailsUpdateDetails,
  MaintenanceDetailsUpdateDetailsComplete,
} from './maintenance-details.actions';

@Injectable()
export class MaintenanceDetailsEffects {
  constructor(
    private actions$: Actions,
    private shortLinkService: ShortlinkService,
    private chartsService: ChartsService,
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

  @Effect()
  updateDetails$: Observable<Action> = this.actions$.pipe(
    ofType<MaintenanceDetailsUpdateDetails>(
      maintenanceDetailsActions.updateDetails
    ),
    debounceTime(300),
    switchMap((action) =>
      this.shortLinkService.put(action.model).pipe(
        map(
          (resp) => new MaintenanceDetailsUpdateDetailsComplete(action.model)
        ),
        tap(() => this.router.navigate(['/maintenance'])),
        catchError((error) => of(new MaintenanceDetailsGetDetailsFailed(error)))
      )
    )
  );

  @Effect()
  getHourlyHits$: Observable<Action> = this.actions$.pipe(
    ofType<MaintenanceDetailsGetHourlyHits>(
      maintenanceDetailsActions.getHourlyHits
    ),
    debounceTime(300),
    switchMap((action) =>
      this.chartsService.getHourlyHits(action.shortCode).pipe(
        map((resp) => new MaintenanceDetailsGetHourlyHitsComplete(resp)),
        catchError((error) =>
          of(new MaintenanceDetailsGetHourlyHitsFailed(error))
        )
      )
    )
  );

  @Effect()
  getDailyHits$: Observable<Action> = this.actions$.pipe(
    ofType<MaintenanceDetailsGetDailyHits>(
      maintenanceDetailsActions.getDailyHits
    ),
    debounceTime(300),
    switchMap((action) =>
      this.chartsService.getDailyHits(action.shortCode).pipe(
        map((resp) => new MaintenanceDetailsGetDailyHitsComplete(resp)),
        catchError((error) =>
          of(new MaintenanceDetailsGetDailyHitsFailed(error))
        )
      )
    )
  );
}
