import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountryDeerInc, CountryDeerInc } from 'app/shared/model/country-deer-inc.model';
import { CountryDeerIncService } from './country-deer-inc.service';
import { CountryDeerIncComponent } from './country-deer-inc.component';
import { CountryDeerIncDetailComponent } from './country-deer-inc-detail.component';
import { CountryDeerIncUpdateComponent } from './country-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class CountryDeerIncResolve implements Resolve<ICountryDeerInc> {
  constructor(private service: CountryDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountryDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((country: HttpResponse<CountryDeerInc>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CountryDeerInc());
  }
}

export const countryRoute: Routes = [
  {
    path: '',
    component: CountryDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CountryDeerIncDetailComponent,
    resolve: {
      country: CountryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CountryDeerIncUpdateComponent,
    resolve: {
      country: CountryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CountryDeerIncUpdateComponent,
    resolve: {
      country: CountryDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.country.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
