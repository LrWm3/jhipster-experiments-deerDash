import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';
import { TaskDeerIncService } from './task-deer-inc.service';
import { TaskDeerIncDeleteDialogComponent } from './task-deer-inc-delete-dialog.component';

@Component({
  selector: 'jhi-task-deer-inc',
  templateUrl: './task-deer-inc.component.html'
})
export class TaskDeerIncComponent implements OnInit, OnDestroy {
  tasks?: ITaskDeerInc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected taskService: TaskDeerIncService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.taskService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITaskDeerInc[]>) => (this.tasks = res.body || []));
      return;
    }

    this.taskService.query().subscribe((res: HttpResponse<ITaskDeerInc[]>) => (this.tasks = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaskDeerInc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('taskListModification', () => this.loadAll());
  }

  delete(task: ITaskDeerInc): void {
    const modalRef = this.modalService.open(TaskDeerIncDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
  }
}
