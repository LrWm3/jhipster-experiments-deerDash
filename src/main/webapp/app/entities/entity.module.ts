import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-deer-inc',
        loadChildren: () => import('./region-deer-inc/region-deer-inc.module').then(m => m.DeerDashRegionDeerIncModule)
      },
      {
        path: 'country-deer-inc',
        loadChildren: () => import('./country-deer-inc/country-deer-inc.module').then(m => m.DeerDashCountryDeerIncModule)
      },
      {
        path: 'location-deer-inc',
        loadChildren: () => import('./location-deer-inc/location-deer-inc.module').then(m => m.DeerDashLocationDeerIncModule)
      },
      {
        path: 'department-deer-inc',
        loadChildren: () => import('./department-deer-inc/department-deer-inc.module').then(m => m.DeerDashDepartmentDeerIncModule)
      },
      {
        path: 'task-deer-inc',
        loadChildren: () => import('./task-deer-inc/task-deer-inc.module').then(m => m.DeerDashTaskDeerIncModule)
      },
      {
        path: 'employee-deer-inc',
        loadChildren: () => import('./employee-deer-inc/employee-deer-inc.module').then(m => m.DeerDashEmployeeDeerIncModule)
      },
      {
        path: 'job-deer-inc',
        loadChildren: () => import('./job-deer-inc/job-deer-inc.module').then(m => m.DeerDashJobDeerIncModule)
      },
      {
        path: 'job-history-deer-inc',
        loadChildren: () => import('./job-history-deer-inc/job-history-deer-inc.module').then(m => m.DeerDashJobHistoryDeerIncModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DeerDashEntityModule {}
