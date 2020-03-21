import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { DepartmentDeerIncComponent } from './department-deer-inc.component';
import { DepartmentDeerIncDetailComponent } from './department-deer-inc-detail.component';
import { DepartmentDeerIncUpdateComponent } from './department-deer-inc-update.component';
import { DepartmentDeerIncDeleteDialogComponent } from './department-deer-inc-delete-dialog.component';
import { departmentRoute } from './department-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(departmentRoute)],
  declarations: [
    DepartmentDeerIncComponent,
    DepartmentDeerIncDetailComponent,
    DepartmentDeerIncUpdateComponent,
    DepartmentDeerIncDeleteDialogComponent
  ],
  entryComponents: [DepartmentDeerIncDeleteDialogComponent]
})
export class DeerDashDepartmentDeerIncModule {}
