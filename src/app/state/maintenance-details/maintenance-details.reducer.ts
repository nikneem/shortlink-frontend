import { maintenanceDetailsActions } from './maintenance-details.actions';
import { MaintenanceDetailsState } from './maintenance-details.state';

export function MaintenanceDetailsReducer(
  state: MaintenanceDetailsState,
  action: any
) {
  {
    switch (action.type) {
      case maintenanceDetailsActions.getDetails:
        return { ...state, isLoading: true };
      case maintenanceDetailsActions.getDetailsComplete:
        return { ...state, isLoading: false, model: action.model };
      case maintenanceDetailsActions.getDetailsFailed:
        return { ...state, isLoading: false };
      default:
        return state;
    }
  }
}
