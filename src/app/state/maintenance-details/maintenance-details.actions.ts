import { Action } from '@ngrx/store';
import { ShortLinkDetailsDto } from '@state/home/home.models';

export const maintenanceDetailsActions = {
  getDetails: '[maintenanceDetailsActions] getDetails',
  getDetailsComplete: '[maintenanceDetailsActions] getDetailsComplete',
  getDetailsFailed: '[maintenanceDetailsActions] getDetailsFailed',
};

export class MaintenanceDetailsGetDetails implements Action {
  readonly type = maintenanceDetailsActions.getDetails;
  constructor(public id: string) {}
}
export class MaintenanceDetailsGetDetailsComplete implements Action {
  readonly type = maintenanceDetailsActions.getDetailsComplete;
  constructor(public model: ShortLinkDetailsDto) {}
}
export class MaintenanceDetailsGetDetailsFailed implements Action {
  readonly type = maintenanceDetailsActions.getDetailsFailed;
  constructor(public errorMessage: string) {}
}
