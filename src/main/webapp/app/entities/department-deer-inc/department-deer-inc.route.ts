import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentDeerInc, DepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';
import { DepartmentDeerIncService } from './department-deer-inc.service';
import { DepartmentDeerIncComponent } from './department-deer-inc.component';
import { DepartmentDeerIncDetailComponent } from './department-deer-inc-detail.component';
import { DepartmentDeerIncUpdateComponent } from './department-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentDeerIncResolve implements Resolve<IDepartmentDeerInc> {
  constructor(private service: DepartmentDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((department: HttpResponse<DepartmentDeerInc>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentDeerInc());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartmentDeerIncDetailComponent,
    resolve: {
      department: DepartmentDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartmentDeerIncUpdateComponent,
    resolve: {
      department: DepartmentDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartmentDeerIncUpdateComponent,
    resolve: {
      department: DepartmentDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
