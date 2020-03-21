import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegionDeerInc } from 'app/shared/model/region-deer-inc.model';
import { RegionDeerIncService } from './region-deer-inc.service';

@Component({
  templateUrl: './region-deer-inc-delete-dialog.component.html'
})
export class RegionDeerIncDeleteDialogComponent {
  region?: IRegionDeerInc;

  constructor(protected regionService: RegionDeerIncService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regionListModification');
      this.activeModal.close();
    });
  }
}
