import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';

@Component({
  selector: 'jhi-task-deer-inc-detail',
  templateUrl: './task-deer-inc-detail.component.html'
})
export class TaskDeerIncDetailComponent implements OnInit {
  task: ITaskDeerInc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => (this.task = task));
  }

  previousState(): void {
    window.history.back();
  }
}
