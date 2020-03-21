import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionDeerInc } from 'app/shared/model/region-deer-inc.model';
import { RegionDeerIncService } from './region-deer-inc.service';
import { RegionDeerIncDeleteDialogComponent } from './region-deer-inc-delete-dialog.component';

@Component({
  selector: 'jhi-region-deer-inc',
  templateUrl: './region-deer-inc.component.html'
})
export class RegionDeerIncComponent implements OnInit, OnDestroy {
  regions?: IRegionDeerInc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected regionService: RegionDeerIncService,
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
      this.regionService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRegionDeerInc[]>) => (this.regions = res.body || []));
      return;
    }

    this.regionService.query().subscribe((res: HttpResponse<IRegionDeerInc[]>) => (this.regions = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRegions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRegionDeerInc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRegions(): void {
    this.eventSubscriber = this.eventManager.subscribe('regionListModification', () => this.loadAll());
  }

  delete(region: IRegionDeerInc): void {
    const modalRef = this.modalService.open(RegionDeerIncDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.region = region;
  }
}
