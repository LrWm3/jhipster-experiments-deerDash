import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountryDeerInc } from 'app/shared/model/country-deer-inc.model';
import { CountryDeerIncService } from './country-deer-inc.service';

@Component({
  templateUrl: './country-deer-inc-delete-dialog.component.html'
})
export class CountryDeerIncDeleteDialogComponent {
  country?: ICountryDeerInc;

  constructor(
    protected countryService: CountryDeerIncService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('countryListModification');
      this.activeModal.close();
    });
  }
}
