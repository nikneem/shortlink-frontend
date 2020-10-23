import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ShortLinkDetailsDto } from '@state/home/home.models';
import {
  MaintenanceDetailsDeleteDetails,
  MaintenanceDetailsGetDailyHits,
  MaintenanceDetailsGetDetails,
  MaintenanceDetailsGetHourlyHits,
  MaintenanceDetailsUpdateDetails,
} from '@state/maintenance-details/maintenance-details.actions';
import { ShortLinkUpdateDto } from '@state/maintenance-details/maintenance-details.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maintenance-details-page',
  templateUrl: './maintenance-details-page.component.html',
  styleUrls: ['./maintenance-details-page.component.scss'],
})
export class MaintenanceDetailsPageComponent implements OnInit, OnDestroy {
  private modelSubscription: Subscription;
  private loadingSubscription: Subscription;

  linkId: string;
  model: ShortLinkDetailsDto;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  loadDetailsWhenRequired() {
    if (this.model && this.model.id === this.linkId) {
      this.constructForm();
      this.store.dispatch(
        new MaintenanceDetailsGetHourlyHits(this.model.shortCode)
      );
      this.store.dispatch(
        new MaintenanceDetailsGetDailyHits(this.model.shortCode)
      );
    } else {
      this.store.dispatch(new MaintenanceDetailsGetDetails(this.linkId));
    }
  }

  constructForm() {
    this.form = new FormGroup({
      id: new FormControl(this.model.id, [Validators.required]),
      shortCode: new FormControl(this.model.shortCode, [Validators.required]),
      endpointUrl: new FormControl(this.model.endpointUrl, [
        Validators.required,
      ]),
      totalHits: new FormControl(this.model.totalHits),
      createdOn: new FormControl({
        value: this.model.createdOn,
        disabled: true,
      }),
      expirationOn: new FormControl(this.model.expirationOn, [
        Validators.required,
      ]),
    });
  }

  submitForm() {
    console.log(this.form.value);
  }
  save() {
    var dto = new ShortLinkUpdateDto(this.form.value);
    this.store.dispatch(new MaintenanceDetailsUpdateDetails(dto));
  }
  delete() {
    this.store.dispatch(new MaintenanceDetailsDeleteDetails(this.linkId));
  }
  back() {
    this.router.navigate(['/maintenance']);
  }
  ngOnInit(): void {
    this.linkId = this.route.snapshot.paramMap.get('id');

    this.modelSubscription = this.store
      .select((str) => str.maintenanceDetailsState.model)
      .subscribe((val) => {
        this.model = val;
        this.loadDetailsWhenRequired();
      });
    this.loadingSubscription = this.store
      .select((str) => str.maintenanceDetailsState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }

  ngOnDestroy(): void {
    this.modelSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
