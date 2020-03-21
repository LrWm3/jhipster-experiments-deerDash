import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';
import { JobHistoryDeerIncService } from './job-history-deer-inc.service';

@Component({
  templateUrl: './job-history-deer-inc-delete-dialog.component.html'
})
export class JobHistoryDeerIncDeleteDialogComponent {
  jobHistory?: IJobHistoryDeerInc;

  constructor(
    protected jobHistoryService: JobHistoryDeerIncService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobHistoryListModification');
      this.activeModal.close();
    });
  }
}
