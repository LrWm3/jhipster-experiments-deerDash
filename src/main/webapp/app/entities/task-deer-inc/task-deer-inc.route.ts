import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaskDeerInc, TaskDeerInc } from 'app/shared/model/task-deer-inc.model';
import { TaskDeerIncService } from './task-deer-inc.service';
import { TaskDeerIncComponent } from './task-deer-inc.component';
import { TaskDeerIncDetailComponent } from './task-deer-inc-detail.component';
import { TaskDeerIncUpdateComponent } from './task-deer-inc-update.component';

@Injectable({ providedIn: 'root' })
export class TaskDeerIncResolve implements Resolve<ITaskDeerInc> {
  constructor(private service: TaskDeerIncService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskDeerInc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((task: HttpResponse<TaskDeerInc>) => {
          if (task.body) {
            return of(task.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskDeerInc());
  }
}

export const taskRoute: Routes = [
  {
    path: '',
    component: TaskDeerIncComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TaskDeerIncDetailComponent,
    resolve: {
      task: TaskDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TaskDeerIncUpdateComponent,
    resolve: {
      task: TaskDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TaskDeerIncUpdateComponent,
    resolve: {
      task: TaskDeerIncResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'deerDashApp.task.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
