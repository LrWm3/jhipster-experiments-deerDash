import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJobHistoryDeerInc, JobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';
import { JobHistoryDeerIncService } from './job-history-deer-inc.service';
import { JobHistoryDeerIncComponent } from './job-history-deer-inc.component';
import { JobHistoryDeerIncDetailComponent } from './job-history-deer-inc-detail.component';
import { JobHistoryDeerIncUpdateComponent } from './job-history-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class JobHistoryDeerIncResolve implements Resolve<IJobHistoryDeerInc> {
  constructor(private service: JobHistoryDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobHistoryDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((jobHistory: HttpResponse<JobHistoryDeerInc>) => {
          if (jobHistory.body) {
            return of(jobHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobHistoryDeerInc());
  }
}

export const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JobHistoryDeerIncDetailComponent,
    resolve: {
      jobHistory: JobHistoryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JobHistoryDeerIncUpdateComponent,
    resolve: {
      jobHistory: JobHistoryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JobHistoryDeerIncUpdateComponent,
    resolve: {
      jobHistory: JobHistoryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.jobHistory.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
