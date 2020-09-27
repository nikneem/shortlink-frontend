import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ShortLinkDetailsDto } from '@state/home/home.models';
import { basename } from 'path';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maintenance-template-crumble',
  templateUrl: './maintenance-template-crumble.component.html',
  styleUrls: ['./maintenance-template-crumble.component.scss'],
})
export class MaintenanceTemplateCrumbleComponent implements OnInit, OnDestroy {
  private detailsSubscription: Subscription;
  model: ShortLinkDetailsDto;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.detailsSubscription = this.store
      .select((str) => str.maintenanceDetailsState.model)
      .subscribe((val) => (this.model = val));
  }
  ngOnDestroy(): void {
    this.detailsSubscription.unsubscribe();
  }
}
