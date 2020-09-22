import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { MaintenanceListGetList } from '@state/maintenance-list/maintenance-list.actions';
import { ShortLinkListItemDto } from '@state/maintenance-list/maintenance-list.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maintenance-list-page',
  templateUrl: './maintenance-list-page.component.html',
  styleUrls: ['./maintenance-list-page.component.scss'],
})
export class MaintenanceListPageComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription;
  private listSubscription: Subscription;

  isLoading: boolean;
  list: Array<ShortLinkListItemDto>;
  displayedColumns: string[] = [
    'shortCode',
    'endpointUrl',
    'expirationOn',
    'totalHits',
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.maintenanceListState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.listSubscription = this.store
      .select((str) => str.maintenanceListState.list)
      .subscribe((val) => (this.list = val));

    this.store.dispatch(new MaintenanceListGetList());
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.listSubscription.unsubscribe();
  }
}
