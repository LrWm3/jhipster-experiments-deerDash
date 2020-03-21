import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { RegionDeerIncComponent } from './region-deer-inc.component';
import { RegionDeerIncDetailComponent } from './region-deer-inc-detail.component';
import { RegionDeerIncUpdateComponent } from './region-deer-inc-update.component';
import { RegionDeerIncDeleteDialogComponent } from './region-deer-inc-delete-dialog.component';
import { regionRoute } from './region-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(regionRoute)],
  declarations: [RegionDeerIncComponent, RegionDeerIncDetailComponent, RegionDeerIncUpdateComponent, RegionDeerIncDeleteDialogComponent],
  entryComponents: [RegionDeerIncDeleteDialogComponent]
})
export class DeerDashRegionDeerIncModule {}
