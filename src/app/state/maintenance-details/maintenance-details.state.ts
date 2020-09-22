import { ShortLinkDetailsDto } from '@state/home/home.models';

export interface MaintenanceDetailsState {
  model?: ShortLinkDetailsDto;

  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_MAINTENANCE_DETAILS_STATE: MaintenanceDetailsState = {
  errorMessage: null,
  isLoading: false,
};
