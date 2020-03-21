import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryDeerInc } from 'app/shared/model/country-deer-inc.model';

@Component({
  selector: 'jhi-country-deer-inc-detail',
  templateUrl: './country-deer-inc-detail.component.html'
})
export class CountryDeerIncDetailComponent implements OnInit {
  country: ICountryDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => (this.country = country));
  }

  previousState(): void {
    window.history.back();
  }
}
