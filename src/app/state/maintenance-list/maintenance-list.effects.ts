import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ShortlinkService } from '@services/shortlink.service';
import { AppState } from '@state/app.state';
import { HomePostUrlFailedAction } from '@state/home/home.actions';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  map,
  catchError,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators';
import {
  maintenanceListActions,
  MaintenanceListGetList,
  MaintenanceListGetListComplete,
} from './maintenance-list.actions';

@Injectable()
export class MaintenanceListEffects {
  constructor(
    private actions$: Actions,
    private shortLinkService: ShortlinkService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  @Effect()
  getList$: Observable<Action> = this.actions$.pipe(
    ofType<MaintenanceListGetList>(maintenanceListActions.getList),
    withLatestFrom(this.store.select((str) => str.maintenanceListState)),
    debounceTime(300),
    mergeMap(([action, state]) =>
      this.shortLinkService.list(state.page, state.pageSize).pipe(
        map((resp) => new MaintenanceListGetListComplete(resp)),
        catchError((error) => of(new HomePostUrlFailedAction(error)))
      )
    )
  );
}
