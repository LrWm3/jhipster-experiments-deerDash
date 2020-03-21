import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILocationDeerInc, LocationDeerInc } from 'app/shared/model/location-deer-inc.model';
import { LocationDeerIncService } from './location-deer-inc.service';
import { ICountryDeerInc } from 'app/shared/model/country-deer-inc.model';
import { CountryDeerIncService } from 'app/entities/country-deer-inc/country-deer-inc.service';

@Component({
  selector: 'jhi-location-deer-inc-update',
  templateUrl: './location-deer-inc-update.component.html'
})
export class LocationDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountryDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    countryId: []
  });

  constructor(
    protected locationService: LocationDeerIncService,
    protected countryService: CountryDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.countryService
        .query({ filter: 'location-is-null' })
        .pipe(
          map((res: HttpResponse<ICountryDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICountryDeerInc[]) => {
          if (!location.countryId) {
            this.countries = resBody;
          } else {
            this.countryService
              .find(location.countryId)
              .pipe(
                map((subRes: HttpResponse<ICountryDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICountryDeerInc[]) => (this.countries = concatRes));
          }
        });
    });
  }

  updateForm(location: ILocationDeerInc): void {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      countryId: location.countryId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocationDeerInc {
    return {
      ...new LocationDeerInc(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      countryId: this.editForm.get(['countryId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationDeerInc>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICountryDeerInc): any {
    return item.id;
  }
}
