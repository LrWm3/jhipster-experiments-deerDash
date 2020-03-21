import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeerDashTestModule } from '../../../test.module';
import { DepartmentDeerIncComponent } from 'app/entities/department-deer-inc/department-deer-inc.component';
import { DepartmentDeerIncService } from 'app/entities/department-deer-inc/department-deer-inc.service';
import { DepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';

describe('Component Tests', () => {
  describe('DepartmentDeerInc Management Component', () => {
    let comp: DepartmentDeerIncComponent;
    let fixture: ComponentFixture<DepartmentDeerIncComponent>;
    let service: DepartmentDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [DepartmentDeerIncComponent]
      })
        .overrideTemplate(DepartmentDeerIncComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentDeerIncComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentDeerIncService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentDeerInc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departments && comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
