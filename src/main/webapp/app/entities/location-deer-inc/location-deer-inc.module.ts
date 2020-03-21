import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { LocationDeerIncComponent } from './location-deer-inc.component';
import { LocationDeerIncDetailComponent } from './location-deer-inc-detail.component';
import { LocationDeerIncUpdateComponent } from './location-deer-inc-update.component';
import { LocationDeerIncDeleteDialogComponent } from './location-deer-inc-delete-dialog.component';
import { locationRoute } from './location-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(locationRoute)],
  declarations: [
    LocationDeerIncComponent,
    LocationDeerIncDetailComponent,
    LocationDeerIncUpdateComponent,
    LocationDeerIncDeleteDialogComponent
  ],
  entryComponents: [LocationDeerIncDeleteDialogComponent]
})
export class DeerDashLocationDeerIncModule {}
