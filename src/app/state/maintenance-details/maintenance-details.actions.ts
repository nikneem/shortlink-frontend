import { Action } from '@ngrx/store';
import { ShortLinkDetailsDto } from '@state/home/home.models';
import {
  DailyHitsDto,
  HourlyHitsDto,
  ShortLinkUpdateDto,
} from './maintenance-details.models';

export const maintenanceDetailsActions = {
  reset: '[maintenanceDetailsActions] reset',

  getDetails: '[maintenanceDetailsActions] getDetails',
  getDetailsComplete: '[maintenanceDetailsActions] getDetailsComplete',
  getDetailsFailed: '[maintenanceDetailsActions] getDetailsFailed',

  updateDetails: '[maintenanceDetailsActions] updateDetails',
  updateDetailsComplete: '[maintenanceDetailsActions] updateDetailsComplete',
  updateDetailsFailed: '[maintenanceDetailsActions] updateDetailsFailed',

  deleteDetails: '[maintenanceDetailsActions] deleteDetails',
  deleteDetailsComplete: '[maintenanceDetailsActions] deleteDetailsComplete',
  deleteDetailsFailed: '[maintenanceDetailsActions] deleteDetailsFailed',

  getHourlyHits: '[maintenanceDetailsActions] getHourlyHits',
  getHourlyHitsComplete: '[maintenanceDetailsActions] getHourlyHitsComplete',
  getHourlyHitsFailed: '[maintenanceDetailsActions] getHourlyHitsFailed',

  getDailyHits: '[maintenanceDetailsActions] getDailyHits',
  getDailyHitsComplete: '[maintenanceDetailsActions] getDailyHitsComplete',
  getDailyHitsFailed: '[maintenanceDetailsActions] getDailyHitsFailed',
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

export class MaintenanceDetailsDeleteDetails implements Action {
  readonly type = maintenanceDetailsActions.deleteDetails;
  constructor(public id: string) {}
}
export class MaintenanceDetailsDeleteDetailsComplete implements Action {
  readonly type = maintenanceDetailsActions.deleteDetailsComplete;
  constructor(public id: string) {}
}
export class MaintenanceDetailsDeleteDetailsFailed implements Action {
  readonly type = maintenanceDetailsActions.deleteDetailsFailed;
  constructor(public errorMessage: string) {}
}


export class MaintenanceDetailsGetHourlyHits implements Action {
  readonly type = maintenanceDetailsActions.getHourlyHits;
  constructor(public shortCode: string) {}
}
export class MaintenanceDetailsGetHourlyHitsComplete implements Action {
  readonly type = maintenanceDetailsActions.getHourlyHitsComplete;
  constructor(public chartData: Array<HourlyHitsDto>) {}
}
export class MaintenanceDetailsGetHourlyHitsFailed implements Action {
  readonly type = maintenanceDetailsActions.getHourlyHitsFailed;
  constructor(public errorMessage: string) {}
}

export class MaintenanceDetailsGetDailyHits implements Action {
  readonly type = maintenanceDetailsActions.getDailyHits;
  constructor(public shortCode: string) {}
}
export class MaintenanceDetailsGetDailyHitsComplete implements Action {
  readonly type = maintenanceDetailsActions.getDailyHitsComplete;
  constructor(public chartData: Array<DailyHitsDto>) {}
}
export class MaintenanceDetailsGetDailyHitsFailed implements Action {
  readonly type = maintenanceDetailsActions.getDailyHitsFailed;
  constructor(public errorMessage: string) {}
}
