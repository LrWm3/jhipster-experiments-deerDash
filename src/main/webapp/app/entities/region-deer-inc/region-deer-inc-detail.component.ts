import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionDeerInc } from 'app/shared/model/region-deer-inc.model';

@Component({
  selector: 'jhi-region-deer-inc-detail',
  templateUrl: './region-deer-inc-detail.component.html'
})
export class RegionDeerIncDetailComponent implements OnInit {
  region: IRegionDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => (this.region = region));
  }

  previousState(): void {
    window.history.back();
  }
}
