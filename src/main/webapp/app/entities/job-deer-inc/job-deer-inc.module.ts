import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { JobDeerIncComponent } from './job-deer-inc.component';
import { JobDeerIncDetailComponent } from './job-deer-inc-detail.component';
import { JobDeerIncUpdateComponent } from './job-deer-inc-update.component';
import { JobDeerIncDeleteDialogComponent } from './job-deer-inc-delete-dialog.component';
import { jobRoute } from './job-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(jobRoute)],
  declarations: [JobDeerIncComponent, JobDeerIncDetailComponent, JobDeerIncUpdateComponent, JobDeerIncDeleteDialogComponent],
  entryComponents: [JobDeerIncDeleteDialogComponent]
})
export class DeerDashJobDeerIncModule {}
