import { routerReducer } from '@ngrx/router-store';
import { HomeReducer } from './home/home.reducer';
import { HomeState, INITIAL_HOME_STATE } from './home/home.state';

export interface AppState {
  homeState: HomeState;
}

export const INITIAL_APPSTATE: AppState = {
  homeState: INITIAL_HOME_STATE,
};

export const reducers = {
  routerReducer,
  homeState: HomeReducer,
};
