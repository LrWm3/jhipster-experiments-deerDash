import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { TaskDeerIncComponent } from './task-deer-inc.component';
import { TaskDeerIncDetailComponent } from './task-deer-inc-detail.component';
import { TaskDeerIncUpdateComponent } from './task-deer-inc-update.component';
import { TaskDeerIncDeleteDialogComponent } from './task-deer-inc-delete-dialog.component';
import { taskRoute } from './task-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(taskRoute)],
  declarations: [TaskDeerIncComponent, TaskDeerIncDetailComponent, TaskDeerIncUpdateComponent, TaskDeerIncDeleteDialogComponent],
  entryComponents: [TaskDeerIncDeleteDialogComponent]
})
export class DeerDashTaskDeerIncModule {}
