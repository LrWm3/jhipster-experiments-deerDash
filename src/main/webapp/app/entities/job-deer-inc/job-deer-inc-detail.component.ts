import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';

@Component({
  selector: 'jhi-job-deer-inc-detail',
  templateUrl: './job-deer-inc-detail.component.html'
})
export class JobDeerIncDetailComponent implements OnInit {
  job: IJobDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => (this.job = job));
  }

  previousState(): void {
    window.history.back();
  }
}
