import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { CountryDeerIncDetailComponent } from 'app/entities/country-deer-inc/country-deer-inc-detail.component';
import { CountryDeerInc } from 'app/shared/model/country-deer-inc.model';

describe('Component Tests', () => {
  describe('CountryDeerInc Management Detail Component', () => {
    let comp: CountryDeerIncDetailComponent;
    let fixture: ComponentFixture<CountryDeerIncDetailComponent>;
    const route = ({ data: of({ country: new CountryDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [CountryDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CountryDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load country on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.country).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
