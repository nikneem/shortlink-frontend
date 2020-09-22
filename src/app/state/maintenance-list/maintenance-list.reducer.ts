import { maintenanceListActions } from './maintenance-list.actions';
import { MaintenanceListState } from './maintenance-list.state';

export function MaintenanceListReducer(
  state: MaintenanceListState,
  action: any
) {
  {
    switch (action.type) {
      case maintenanceListActions.getList:
        return { ...state, isLoading: true };
      case maintenanceListActions.getListComplete:
        return { ...state, isLoading: false, list: action.list };
      case maintenanceListActions.getListFailed:
        return { ...state, isLoading: false };
      default:
        return state;
    }
  }
}
