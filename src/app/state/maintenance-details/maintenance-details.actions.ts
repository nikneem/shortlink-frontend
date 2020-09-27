import { Action } from '@ngrx/store';
import { ShortLinkDetailsDto } from '@state/home/home.models';
import { ShortLinkUpdateDto } from './maintenance-details.models';

export const maintenanceDetailsActions = {
  reset: '[maintenanceDetailsActions] reset',

  getDetails: '[maintenanceDetailsActions] getDetails',
  getDetailsComplete: '[maintenanceDetailsActions] getDetailsComplete',
  getDetailsFailed: '[maintenanceDetailsActions] getDetailsFailed',

  updateDetails: '[maintenanceDetailsActions] updateDetails',
  updateDetailsComplete: '[maintenanceDetailsActions] updateDetailsComplete',
  updateDetailsFailed: '[maintenanceDetailsActions] updateDetailsFailed',
};

export class MaintenanceDetailsReset implements Action {
  readonly type = maintenanceDetailsActions.reset;
  constructor() {}
}

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

export class MaintenanceDetailsUpdateDetails implements Action {
  readonly type = maintenanceDetailsActions.updateDetails;
  constructor(public model: ShortLinkUpdateDto) {}
}
export class MaintenanceDetailsUpdateDetailsComplete implements Action {
  readonly type = maintenanceDetailsActions.updateDetailsComplete;
  constructor(public model: ShortLinkUpdateDto) {}
}
export class MaintenanceDetailsUpdateDetailsFailed implements Action {
  readonly type = maintenanceDetailsActions.updateDetailsFailed;
  constructor(public errorMessage: string) {}
}
