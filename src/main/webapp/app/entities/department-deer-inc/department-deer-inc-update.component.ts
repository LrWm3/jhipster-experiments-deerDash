import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDepartmentDeerInc, DepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from './department-deer-inc.service';
import { ILocationDeerInc } from 'app/shared/model/location-deer-inc.model';
import { LocationDeerIncService } from 'app/entities/location-deer-inc/location-deer-inc.service';

@Component({
  selector: 'jhi-department-deer-inc-update',
  templateUrl: './department-deer-inc-update.component.html'
})
export class DepartmentDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  locations: ILocationDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required]],
    locationId: []
  });

  constructor(
    protected departmentService: DepartmentDeerIncService,
    protected locationService: LocationDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.locationService
        .query({ filter: 'department-is-null' })
        .pipe(
          map((res: HttpResponse<ILocationDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocationDeerInc[]) => {
          if (!department.locationId) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(department.locationId)
              .pipe(
                map((subRes: HttpResponse<ILocationDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocationDeerInc[]) => (this.locations = concatRes));
          }
        });
    });
  }

  updateForm(department: IDepartmentDeerInc): void {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName,
      locationId: department.locationId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentDeerInc {
    return {
      ...new DepartmentDeerInc(),
      id: this.editForm.get(['id'])!.value,
      departmentName: this.editForm.get(['departmentName'])!.value,
      locationId: this.editForm.get(['locationId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentDeerInc>>): void {
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

  trackById(index: number, item: ILocationDeerInc): any {
    return item.id;
  }
}
