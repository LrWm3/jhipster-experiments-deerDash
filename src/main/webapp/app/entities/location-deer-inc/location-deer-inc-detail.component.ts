import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationDeerInc } from 'app/shared/model/location-deer-inc.model';

@Component({
  selector: 'jhi-location-deer-inc-detail',
  templateUrl: './location-deer-inc-detail.component.html'
})
export class LocationDeerIncDetailComponent implements OnInit {
  location: ILocationDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => (this.location = location));
  }

  previousState(): void {
    window.history.back();
  }
}
