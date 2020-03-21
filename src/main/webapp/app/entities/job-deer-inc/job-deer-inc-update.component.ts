import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IJobDeerInc, JobDeerInc } from 'app/shared/model/job-deer-inc.model';
import { JobDeerIncService } from './job-deer-inc.service';
import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';
import { TaskDeerIncService } from 'app/entities/task-deer-inc/task-deer-inc.service';
import { IEmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';
import { EmployeeDeerIncService } from 'app/entities/employee-deer-inc/employee-deer-inc.service';

type SelectableEntity = ITaskDeerInc | IEmployeeDeerInc;

@Component({
  selector: 'jhi-job-deer-inc-update',
  templateUrl: './job-deer-inc-update.component.html'
})
export class JobDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  tasks: ITaskDeerInc[] = [];
  employees: IEmployeeDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employeeId: []
  });

  constructor(
    protected jobService: JobDeerIncService,
    protected taskService: TaskDeerIncService,
    protected employeeService: EmployeeDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);

      this.taskService.query().subscribe((res: HttpResponse<ITaskDeerInc[]>) => (this.tasks = res.body || []));

      this.employeeService.query().subscribe((res: HttpResponse<IEmployeeDeerInc[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(job: IJobDeerInc): void {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employeeId: job.employeeId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  private createFromForm(): IJobDeerInc {
    return {
      ...new JobDeerInc(),
      id: this.editForm.get(['id'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      minSalary: this.editForm.get(['minSalary'])!.value,
      maxSalary: this.editForm.get(['maxSalary'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employeeId: this.editForm.get(['employeeId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobDeerInc>>): void {
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

  getSelected(selectedVals: ITaskDeerInc[], option: ITaskDeerInc): ITaskDeerInc {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
