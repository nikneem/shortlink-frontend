import { Action } from '@ngrx/store';
import { ShortLinkListItemDto } from './maintenance-list.models';

export const maintenanceListActions = {
  setPage: '[maintenanceListActions] setPage',
  setPageSize: '[maintenanceListActions] setPageSize',

  getList: '[maintenanceListActions] getList',
  getListComplete: '[maintenanceListActions] getListComplete',
  getListFailed: '[maintenanceListActions] getListFailed',
};

export class MaintenanceListSetPage implements Action {
  readonly type = maintenanceListActions.setPage;
  constructor(public page: number) {}
}
export class MaintenanceListSetPageSize implements Action {
  readonly type = maintenanceListActions.setPageSize;
  constructor(public pageSize: number) {}
}
export class MaintenanceListGetList implements Action {
  readonly type = maintenanceListActions.getList;
  constructor() {}
}
export class MaintenanceListGetListComplete implements Action {
  readonly type = maintenanceListActions.getListComplete;
  constructor(public list: Array<ShortLinkListItemDto>) {}
}
export class MaintenanceListGetListFailed implements Action {
  readonly type = maintenanceListActions.getListFailed;
  constructor(public errorMessage: string) {}
}
