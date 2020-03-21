import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryDeerInc } from 'app/shared/model/country-deer-inc.model';
import { CountryDeerIncService } from './country-deer-inc.service';
import { CountryDeerIncDeleteDialogComponent } from './country-deer-inc-delete-dialog.component';

@Component({
  selector: 'jhi-country-deer-inc',
  templateUrl: './country-deer-inc.component.html'
})
export class CountryDeerIncComponent implements OnInit, OnDestroy {
  countries?: ICountryDeerInc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected countryService: CountryDeerIncService,
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
      this.countryService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ICountryDeerInc[]>) => (this.countries = res.body || []));
      return;
    }

    this.countryService.query().subscribe((res: HttpResponse<ICountryDeerInc[]>) => (this.countries = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountryDeerInc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', () => this.loadAll());
  }

  delete(country: ICountryDeerInc): void {
    const modalRef = this.modalService.open(CountryDeerIncDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
  }
}
