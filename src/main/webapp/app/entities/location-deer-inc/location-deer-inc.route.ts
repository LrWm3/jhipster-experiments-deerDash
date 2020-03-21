import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocationDeerInc, LocationDeerInc } from 'app/shared/model/location-deer-inc.model';
import { LocationDeerIncService } from './location-deer-inc.service';
import { LocationDeerIncComponent } from './location-deer-inc.component';
import { LocationDeerIncDetailComponent } from './location-deer-inc-detail.component';
import { LocationDeerIncUpdateComponent } from './location-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class LocationDeerIncResolve implements Resolve<ILocationDeerInc> {
  constructor(private service: LocationDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocationDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((location: HttpResponse<LocationDeerInc>) => {
          if (location.body) {
            return of(location.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocationDeerInc());
  }
}

export const locationRoute: Routes = [
  {
    path: '',
    component: LocationDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocationDeerIncDetailComponent,
    resolve: {
      location: LocationDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocationDeerIncUpdateComponent,
    resolve: {
      location: LocationDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocationDeerIncUpdateComponent,
    resolve: {
      location: LocationDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.location.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
