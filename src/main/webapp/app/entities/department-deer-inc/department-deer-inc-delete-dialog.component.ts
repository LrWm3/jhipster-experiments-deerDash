import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from './department-deer-inc.service';

@Component({
  templateUrl: './department-deer-inc-delete-dialog.component.html'
})
export class DepartmentDeerIncDeleteDialogComponent {
  department?: IDepartmentDeerInc;

  constructor(
    protected departmentService: DepartmentDeerIncService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentListModification');
      this.activeModal.close();
    });
  }
}
