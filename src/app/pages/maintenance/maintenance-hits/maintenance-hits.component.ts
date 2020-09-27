import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-hits',
  templateUrl: './maintenance-hits.component.html',
  styleUrls: ['./maintenance-hits.component.scss'],
})
export class MaintenanceHitsComponent implements OnInit {
  @Input() public hits: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
