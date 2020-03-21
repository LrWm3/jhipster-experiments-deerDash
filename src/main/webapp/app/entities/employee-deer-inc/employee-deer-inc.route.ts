import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployeeDeerInc, EmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';
import { EmployeeDeerIncService } from './employee-deer-inc.service';
import { EmployeeDeerIncComponent } from './employee-deer-inc.component';
import { EmployeeDeerIncDetailComponent } from './employee-deer-inc-detail.component';
import { EmployeeDeerIncUpdateComponent } from './employee-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeeDeerIncResolve implements Resolve<IEmployeeDeerInc> {
  constructor(private service: EmployeeDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employee: HttpResponse<EmployeeDeerInc>) => {
          if (employee.body) {
            return of(employee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeDeerInc());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeDeerIncDetailComponent,
    resolve: {
      employee: EmployeeDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeDeerIncUpdateComponent,
    resolve: {
      employee: EmployeeDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeDeerIncUpdateComponent,
    resolve: {
      employee: EmployeeDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
