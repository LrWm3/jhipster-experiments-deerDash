import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { EmployeeDeerIncComponent } from './employee-deer-inc.component';
import { EmployeeDeerIncDetailComponent } from './employee-deer-inc-detail.component';
import { EmployeeDeerIncUpdateComponent } from './employee-deer-inc-update.component';
import { EmployeeDeerIncDeleteDialogComponent } from './employee-deer-inc-delete-dialog.component';
import { employeeRoute } from './employee-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(employeeRoute)],
  declarations: [
    EmployeeDeerIncComponent,
    EmployeeDeerIncDetailComponent,
    EmployeeDeerIncUpdateComponent,
    EmployeeDeerIncDeleteDialogComponent
  ],
  entryComponents: [EmployeeDeerIncDeleteDialogComponent]
})
export class DeerDashEmployeeDeerIncModule {}
