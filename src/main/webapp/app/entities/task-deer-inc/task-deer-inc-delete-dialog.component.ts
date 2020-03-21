import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';
import { TaskDeerIncService } from './task-deer-inc.service';

@Component({
  templateUrl: './task-deer-inc-delete-dialog.component.html'
})
export class TaskDeerIncDeleteDialogComponent {
  task?: ITaskDeerInc;

  constructor(protected taskService: TaskDeerIncService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taskListModification');
      this.activeModal.close();
    });
  }
}
