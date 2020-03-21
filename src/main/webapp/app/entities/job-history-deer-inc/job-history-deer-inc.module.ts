import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { JobHistoryDeerIncComponent } from './job-history-deer-inc.component';
import { JobHistoryDeerIncDetailComponent } from './job-history-deer-inc-detail.component';
import { JobHistoryDeerIncUpdateComponent } from './job-history-deer-inc-update.component';
import { JobHistoryDeerIncDeleteDialogComponent } from './job-history-deer-inc-delete-dialog.component';
import { jobHistoryRoute } from './job-history-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(jobHistoryRoute)],
  declarations: [
    JobHistoryDeerIncComponent,
    JobHistoryDeerIncDetailComponent,
    JobHistoryDeerIncUpdateComponent,
    JobHistoryDeerIncDeleteDialogComponent
  ],
  entryComponents: [JobHistoryDeerIncDeleteDialogComponent]
})
export class DeerDashJobHistoryDeerIncModule {}
