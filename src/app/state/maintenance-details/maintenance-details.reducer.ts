import { maintenanceDetailsActions } from './maintenance-details.actions';
import { MaintenanceDetailsState } from './maintenance-details.state';

export function MaintenanceDetailsReducer(
  state: MaintenanceDetailsState,
  action: any
) {
  {
    switch (action.type) {
      case maintenanceDetailsActions.reset:
        return { ...state, model: null };

      case maintenanceDetailsActions.getDetails:
        return { ...state, isLoading: true };
      case maintenanceDetailsActions.getDetailsComplete:
        return { ...state, isLoading: false, model: action.model };
      case maintenanceDetailsActions.getDetailsFailed:
        return { ...state, isLoading: false };

      case maintenanceDetailsActions.updateDetails:
        return { ...state, isLoading: true };
      case maintenanceDetailsActions.updateDetailsComplete:
        return { ...state, isLoading: false, model: null };
      case maintenanceDetailsActions.updateDetailsFailed:
        return { ...state, isLoading: false };
      default:
        return state;
    }
  }
}
