import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from './department-deer-inc.service';
import { DepartmentDeerIncDeleteDialogComponent } from './department-deer-inc-delete-dialog.component';

@Component({
  selector: 'jhi-department-deer-inc',
  templateUrl: './department-deer-inc.component.html'
})
export class DepartmentDeerIncComponent implements OnInit, OnDestroy {
  departments?: IDepartmentDeerInc[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected departmentService: DepartmentDeerIncService,
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
      this.departmentService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IDepartmentDeerInc[]>) => (this.departments = res.body || []));
      return;
    }

    this.departmentService.query().subscribe((res: HttpResponse<IDepartmentDeerInc[]>) => (this.departments = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentDeerInc): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartments(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentListModification', () => this.loadAll());
  }

  delete(department: IDepartmentDeerInc): void {
    const modalRef = this.modalService.open(DepartmentDeerIncDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
  }
}
