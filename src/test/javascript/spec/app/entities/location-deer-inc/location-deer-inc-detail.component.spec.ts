import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { LocationDeerIncDetailComponent } from 'app/entities/location-deer-inc/location-deer-inc-detail.component';
import { LocationDeerInc } from 'app/shared/model/location-deer-inc.model';

describe('Component Tests', () => {
  describe('LocationDeerInc Management Detail Component', () => {
    let comp: LocationDeerIncDetailComponent;
    let fixture: ComponentFixture<LocationDeerIncDetailComponent>;
    const route = ({ data: of({ location: new LocationDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [LocationDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LocationDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load location on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.location).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
