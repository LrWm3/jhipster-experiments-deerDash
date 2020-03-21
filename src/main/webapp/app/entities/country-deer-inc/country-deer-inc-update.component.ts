import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountryDeerInc, CountryDeerInc } from 'app/shared/model/country-deer-inc.model';
import { CountryDeerIncService } from './country-deer-inc.service';
import { IRegionDeerInc } from 'app/shared/model/region-deer-inc.model';
import { RegionDeerIncService } from 'app/entities/region-deer-inc/region-deer-inc.service';

@Component({
  selector: 'jhi-country-deer-inc-update',
  templateUrl: './country-deer-inc-update.component.html'
})
export class CountryDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  regions: IRegionDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    regionId: []
  });

  constructor(
    protected countryService: CountryDeerIncService,
    protected regionService: RegionDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.regionService
        .query({ filter: 'country-is-null' })
        .pipe(
          map((res: HttpResponse<IRegionDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRegionDeerInc[]) => {
          if (!country.regionId) {
            this.regions = resBody;
          } else {
            this.regionService
              .find(country.regionId)
              .pipe(
                map((subRes: HttpResponse<IRegionDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRegionDeerInc[]) => (this.regions = concatRes));
          }
        });
    });
  }

  updateForm(country: ICountryDeerInc): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      regionId: country.regionId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountryDeerInc {
    return {
      ...new CountryDeerInc(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      regionId: this.editForm.get(['regionId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryDeerInc>>): void {
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

  trackById(index: number, item: IRegionDeerInc): any {
    return item.id;
  }
}
