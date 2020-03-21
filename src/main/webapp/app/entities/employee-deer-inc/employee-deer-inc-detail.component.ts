import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';

@Component({
  selector: 'jhi-employee-deer-inc-detail',
  templateUrl: './employee-deer-inc-detail.component.html'
})
export class EmployeeDeerIncDetailComponent implements OnInit {
  employee: IEmployeeDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => (this.employee = employee));
  }

  previousState(): void {
    window.history.back();
  }
}
