import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';

@Component({
  selector: 'jhi-department-deer-inc-detail',
  templateUrl: './department-deer-inc-detail.component.html'
})
export class DepartmentDeerIncDetailComponent implements OnInit {
  department: IDepartmentDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => (this.department = department));
  }

  previousState(): void {
    window.history.back();
  }
}
