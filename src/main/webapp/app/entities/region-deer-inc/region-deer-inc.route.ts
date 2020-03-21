import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegionDeerInc, RegionDeerInc } from 'app/shared/model/region-deer-inc.model';
import { RegionDeerIncService } from './region-deer-inc.service';
import { RegionDeerIncComponent } from './region-deer-inc.component';
import { RegionDeerIncDetailComponent } from './region-deer-inc-detail.component';
import { RegionDeerIncUpdateComponent } from './region-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class RegionDeerIncResolve implements Resolve<IRegionDeerInc> {
  constructor(private service: RegionDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((region: HttpResponse<RegionDeerInc>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionDeerInc());
  }
}

export const regionRoute: Routes = [
  {
    path: '',
    component: RegionDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RegionDeerIncDetailComponent,
    resolve: {
      region: RegionDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RegionDeerIncUpdateComponent,
    resolve: {
      region: RegionDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RegionDeerIncUpdateComponent,
    resolve: {
      region: RegionDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.region.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
