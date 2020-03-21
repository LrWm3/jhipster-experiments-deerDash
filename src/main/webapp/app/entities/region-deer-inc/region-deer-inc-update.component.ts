import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRegionDeerInc, RegionDeerInc } from 'app/shared/model/region-deer-inc.model';
import { RegionDeerIncService } from './region-deer-inc.service';

@Component({
  selector: 'jhi-region-deer-inc-update',
  templateUrl: './region-deer-inc-update.component.html'
})
export class RegionDeerIncUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    regionName: []
  });

  constructor(protected regionService: RegionDeerIncService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.updateForm(region);
    });
  }

  updateForm(region: IRegionDeerInc): void {
    this.editForm.patchValue({
      id: region.id,
      regionName: region.regionName
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.createFromForm();
    if (region.id !== undefined) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  private createFromForm(): IRegionDeerInc {
    return {
      ...new RegionDeerInc(),
      id: this.editForm.get(['id'])!.value,
      regionName: this.editForm.get(['regionName'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionDeerInc>>): void {
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
}
