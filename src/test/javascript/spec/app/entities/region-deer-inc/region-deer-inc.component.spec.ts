import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeerDashTestModule } from '../../../test.module';
import { RegionDeerIncComponent } from 'app/entities/region-deer-inc/region-deer-inc.component';
import { RegionDeerIncService } from 'app/entities/region-deer-inc/region-deer-inc.service';
import { RegionDeerInc } from 'app/shared/model/region-deer-inc.model';

describe('Component Tests', () => {
  describe('RegionDeerInc Management Component', () => {
    let comp: RegionDeerIncComponent;
    let fixture: ComponentFixture<RegionDeerIncComponent>;
    let service: RegionDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [RegionDeerIncComponent]
      })
        .overrideTemplate(RegionDeerIncComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionDeerIncComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionDeerIncService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RegionDeerInc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.regions && comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
