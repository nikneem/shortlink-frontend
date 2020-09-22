import { routerReducer } from '@ngrx/router-store';
import { HomeReducer } from './home/home.reducer';
import { HomeState, INITIAL_HOME_STATE } from './home/home.state';
import { MaintenanceDetailsReducer } from './maintenance-details/maintenance-details.reducer';
import {
  INITIAL_MAINTENANCE_DETAILS_STATE,
  MaintenanceDetailsState,
} from './maintenance-details/maintenance-details.state';
import { MaintenanceListReducer } from './maintenance-list/maintenance-list.reducer';
import {
  INITIAL_MAINTENANCE_LIST_STATE,
  MaintenanceListState,
} from './maintenance-list/maintenance-list.state';

export interface AppState {
  homeState: HomeState;
  maintenanceListState: MaintenanceListState;
  maintenanceDetailsState: MaintenanceDetailsState;
}

export const INITIAL_APPSTATE: AppState = {
  homeState: INITIAL_HOME_STATE,
  maintenanceListState: INITIAL_MAINTENANCE_LIST_STATE,
  maintenanceDetailsState: INITIAL_MAINTENANCE_DETAILS_STATE,
};

export const reducers = {
  routerReducer,
  homeState: HomeReducer,
  maintenanceListState: MaintenanceListReducer,
  maintenanceDetailsState: MaintenanceDetailsReducer,
};
