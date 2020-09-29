import { ShortLinkDetailsDto } from '@state/home/home.models';
import { DailyHitsDto, HourlyHitsDto } from './maintenance-details.models';

export interface MaintenanceDetailsState {
  model?: ShortLinkDetailsDto;

  hourlyHits: Array<HourlyHitsDto>;
  dailyHits: Array<DailyHitsDto>;

  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_MAINTENANCE_DETAILS_STATE: MaintenanceDetailsState = {
  hourlyHits: null,
  dailyHits: null,

  errorMessage: null,
  isLoading: false,
};
