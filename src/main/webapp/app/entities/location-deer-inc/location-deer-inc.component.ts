import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationDeerInc } from 'app/shared/model/location-deer-inc.model';
import { LocationDeerIncService } from './location-deer-inc.service';
import { LocationDeerIncDeleteDialogComponent } from './location-deer-inc-delete-dialog.component';

@Component({
  selector: 'jhi-location-deer-inc',
  templateUrl: './location-deer-inc.component.html'
})
export class LocationDeerIncComponent implements OnInit, OnDestroy {
  locations?: ILocationDeerInc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected locationService: LocationDeerIncService,
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
      this.locationService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ILocationDeerInc[]>) => (this.locations = res.body || []));
      return;
    }

    this.locationService.query().subscribe((res: HttpResponse<ILocationDeerInc[]>) => (this.locations = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocationDeerInc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocations(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationListModification', () => this.loadAll());
  }

  delete(location: ILocationDeerInc): void {
    const modalRef = this.modalService.open(LocationDeerIncDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
  }
}
