import { ShortLinkListItemDto } from './maintenance-list.models';

export interface MaintenanceListState {
  page: number;
  pageSize: number;

  list?: Array<ShortLinkListItemDto>;

  isLoading: boolean;
  errorMessage: string;
}

export const INITIAL_MAINTENANCE_LIST_STATE: MaintenanceListState = {
  page: 0,
  pageSize: 25,

  errorMessage: null,
  isLoading: false,
};
