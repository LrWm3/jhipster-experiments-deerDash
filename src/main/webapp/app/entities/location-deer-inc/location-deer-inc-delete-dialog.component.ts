import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationDeerInc } from 'app/shared/model/location-deer-inc.model';
import { LocationDeerIncService } from './location-deer-inc.service';

@Component({
  templateUrl: './location-deer-inc-delete-dialog.component.html'
})
export class LocationDeerIncDeleteDialogComponent {
  location?: ILocationDeerInc;

  constructor(
    protected locationService: LocationDeerIncService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('locationListModification');
      this.activeModal.close();
    });
  }
}
