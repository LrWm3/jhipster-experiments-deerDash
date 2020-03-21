import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';
import { EmployeeDeerIncService } from './employee-deer-inc.service';

@Component({
  templateUrl: './employee-deer-inc-delete-dialog.component.html'
})
export class EmployeeDeerIncDeleteDialogComponent {
  employee?: IEmployeeDeerInc;

  constructor(
    protected employeeService: EmployeeDeerIncService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeeListModification');
      this.activeModal.close();
    });
  }
}
