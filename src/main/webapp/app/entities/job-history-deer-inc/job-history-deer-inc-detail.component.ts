import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';

@Component({
  selector: 'jhi-job-history-deer-inc-detail',
  templateUrl: './job-history-deer-inc-detail.component.html'
})
export class JobHistoryDeerIncDetailComponent implements OnInit {
  jobHistory: IJobHistoryDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => (this.jobHistory = jobHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
