import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { RegionDeerIncDetailComponent } from 'app/entities/region-deer-inc/region-deer-inc-detail.component';
import { RegionDeerInc } from 'app/shared/model/region-deer-inc.model';

describe('Component Tests', () => {
  describe('RegionDeerInc Management Detail Component', () => {
    let comp: RegionDeerIncDetailComponent;
    let fixture: ComponentFixture<RegionDeerIncDetailComponent>;
    const route = ({ data: of({ region: new RegionDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [RegionDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RegionDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RegionDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load region on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.region).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
