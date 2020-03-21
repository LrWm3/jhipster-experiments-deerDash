import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';
import { JobDeerIncService } from './job-deer-inc.service';

@Component({
  templateUrl: './job-deer-inc-delete-dialog.component.html'
})
export class JobDeerIncDeleteDialogComponent {
  job?: IJobDeerInc;

  constructor(protected jobService: JobDeerIncService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobListModification');
      this.activeModal.close();
    });
  }
}
