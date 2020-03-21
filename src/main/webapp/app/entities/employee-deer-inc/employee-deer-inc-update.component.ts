import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmployeeDeerInc, EmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';
import { EmployeeDeerIncService } from './employee-deer-inc.service';
import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from 'app/entities/department-deer-inc/department-deer-inc.service';

type SelectableEntity = IEmployeeDeerInc | IDepartmentDeerInc;

@Component({
  selector: 'jhi-employee-deer-inc-update',
  templateUrl: './employee-deer-inc-update.component.html'
})
export class EmployeeDeerIncUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployeeDeerInc[] = [];
  departments: IDepartmentDeerInc[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    hireDate: [],
    salary: [],
    commissionPct: [],
    managers: [],
    departmentId: []
  });

  constructor(
    protected employeeService: EmployeeDeerIncService,
    protected departmentService: DepartmentDeerIncService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if (!employee.id) {
        const today = moment().startOf('day');
        employee.hireDate = today;
      }

      this.updateForm(employee);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployeeDeerInc[]>) => (this.employees = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartmentDeerInc[]>) => (this.departments = res.body || []));
    });
  }

  updateForm(employee: IEmployeeDeerInc): void {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate: employee.hireDate ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      salary: employee.salary,
      commissionPct: employee.commissionPct,
      managers: employee.managers,
      departmentId: employee.departmentId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployeeDeerInc {
    return {
      ...new EmployeeDeerInc(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      hireDate: this.editForm.get(['hireDate'])!.value ? moment(this.editForm.get(['hireDate'])!.value, DATE_TIME_FORMAT) : undefined,
      salary: this.editForm.get(['salary'])!.value,
      commissionPct: this.editForm.get(['commissionPct'])!.value,
      managers: this.editForm.get(['managers'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeDeerInc>>): void {
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

  getSelected(selectedVals: IEmployeeDeerInc[], option: IEmployeeDeerInc): IEmployeeDeerInc {
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
