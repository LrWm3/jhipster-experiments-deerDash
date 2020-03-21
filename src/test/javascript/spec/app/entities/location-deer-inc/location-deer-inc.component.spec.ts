import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeerDashTestModule } from '../../../test.module';
import { LocationDeerIncComponent } from 'app/entities/location-deer-inc/location-deer-inc.component';
import { LocationDeerIncService } from 'app/entities/location-deer-inc/location-deer-inc.service';
import { LocationDeerInc } from 'app/shared/model/location-deer-inc.model';

describe('Component Tests', () => {
  describe('LocationDeerInc Management Component', () => {
    let comp: LocationDeerIncComponent;
    let fixture: ComponentFixture<LocationDeerIncComponent>;
    let service: LocationDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [LocationDeerIncComponent]
      })
        .overrideTemplate(LocationDeerIncComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationDeerIncComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationDeerIncService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocationDeerInc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.locations && comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
