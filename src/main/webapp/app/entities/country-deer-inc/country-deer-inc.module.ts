import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeerDashSharedModule } from 'app/shared/shared.module';
import { CountryDeerIncComponent } from './country-deer-inc.component';
import { CountryDeerIncDetailComponent } from './country-deer-inc-detail.component';
import { CountryDeerIncUpdateComponent } from './country-deer-inc-update.component';
import { CountryDeerIncDeleteDialogComponent } from './country-deer-inc-delete-dialog.component';
import { countryRoute } from './country-deer-inc.route';

@NgModule({
  imports: [DeerDashSharedModule, RouterModule.forChild(countryRoute)],
  declarations: [
    CountryDeerIncComponent,
    CountryDeerIncDetailComponent,
    CountryDeerIncUpdateComponent,
    CountryDeerIncDeleteDialogComponent
  ],
  entryComponents: [CountryDeerIncDeleteDialogComponent]
})
export class DeerDashCountryDeerIncModule {}
