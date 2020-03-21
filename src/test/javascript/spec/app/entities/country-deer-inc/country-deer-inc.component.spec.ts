import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeerDashTestModule } from '../../../test.module';
import { CountryDeerIncComponent } from 'app/entities/country-deer-inc/country-deer-inc.component';
import { CountryDeerIncService } from 'app/entities/country-deer-inc/country-deer-inc.service';
import { CountryDeerInc } from 'app/shared/model/country-deer-inc.model';

describe('Component Tests', () => {
  describe('CountryDeerInc Management Component', () => {
    let comp: CountryDeerIncComponent;
    let fixture: ComponentFixture<CountryDeerIncComponent>;
    let service: CountryDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [CountryDeerIncComponent]
      })
        .overrideTemplate(CountryDeerIncComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryDeerIncComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryDeerIncService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CountryDeerInc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.countries && comp.countries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
