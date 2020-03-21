import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobHistoryDeerInc, JobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';
import { JobHistoryDeerIncService } from './job-history-deer-inc.service';
import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';
import { JobDeerIncService } from 'app/entities/job-deer-inc/job-deer-inc.service';
import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from 'app/entities/department-deer-inc/department-deer-inc.service';
import { IEmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';
import { EmployeeDeerIncService } from 'app/entities/employee-deer-inc/employee-deer-inc.service';

type SelectableEntity = IJobDeerInc | IDepartmentDeerInc | IEmployeeDeerInc;

@Component({
  selector: 'jhi-job-history-deer-inc-update',
  templateUrl: './job-history-deer-inc-update.component.html'
})
export class JobHistoryDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  jobs: IJobDeerInc[] = [];
  departments: IDepartmentDeerInc[] = [];
  employees: IEmployeeDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    jobId: [],
    departmentId: [],
    employeeId: []
  });

  constructor(
    protected jobHistoryService: JobHistoryDeerIncService,
    protected jobService: JobDeerIncService,
    protected departmentService: DepartmentDeerIncService,
    protected employeeService: EmployeeDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      if (!jobHistory.id) {
        const today = moment().startOf('day');
        jobHistory.startDate = today;
        jobHistory.endDate = today;
      }

      this.updateForm(jobHistory);

      this.jobService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IJobDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IJobDeerInc[]) => {
          if (!jobHistory.jobId) {
            this.jobs = resBody;
          } else {
            this.jobService
              .find(jobHistory.jobId)
              .pipe(
                map((subRes: HttpResponse<IJobDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IJobDeerInc[]) => (this.jobs = concatRes));
          }
        });

      this.departmentService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IDepartmentDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDepartmentDeerInc[]) => {
          if (!jobHistory.departmentId) {
            this.departments = resBody;
          } else {
            this.departmentService
              .find(jobHistory.departmentId)
              .pipe(
                map((subRes: HttpResponse<IDepartmentDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDepartmentDeerInc[]) => (this.departments = concatRes));
          }
        });

      this.employeeService
        .query({ filter: 'jobhistory-is-null' })
        .pipe(
          map((res: HttpResponse<IEmployeeDeerInc[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmployeeDeerInc[]) => {
          if (!jobHistory.employeeId) {
            this.employees = resBody;
          } else {
            this.employeeService
              .find(jobHistory.employeeId)
              .pipe(
                map((subRes: HttpResponse<IEmployeeDeerInc>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmployeeDeerInc[]) => (this.employees = concatRes));
          }
        });
    });
  }

  updateForm(jobHistory: IJobHistoryDeerInc): void {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      jobId: jobHistory.jobId,
      departmentId: jobHistory.departmentId,
      employeeId: jobHistory.employeeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  private createFromForm(): IJobHistoryDeerInc {
    return {
      ...new JobHistoryDeerInc(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
      jobId: this.editForm.get(['jobId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryDeerInc>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
