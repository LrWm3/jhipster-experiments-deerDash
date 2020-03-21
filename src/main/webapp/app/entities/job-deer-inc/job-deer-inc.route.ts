import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobDeerInc, JobDeerInc } from 'app/shared/model/job-deer-inc.model';
import { JobDeerIncService } from './job-deer-inc.service';
import { JobDeerIncComponent } from './job-deer-inc.component';
import { JobDeerIncDetailComponent } from './job-deer-inc-detail.component';
import { JobDeerIncUpdateComponent } from './job-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class JobDeerIncResolve implements Resolve<IJobDeerInc> {
  constructor(private service: JobDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((job: HttpResponse<JobDeerInc>) => {
          if (job.body) {
            return of(job.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobDeerInc());
  }
}

export const jobRoute: Routes = [
  {
    path: '',
    component: JobDeerIncComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'deerDashApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobDeerIncDetailComponent,
    resolve: {
      job: JobDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobDeerIncUpdateComponent,
    resolve: {
      job: JobDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobDeerIncUpdateComponent,
    resolve: {
      job: JobDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.job.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
