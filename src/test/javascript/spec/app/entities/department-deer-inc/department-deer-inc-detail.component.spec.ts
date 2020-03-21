import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { DepartmentDeerIncDetailComponent } from 'app/entities/department-deer-inc/department-deer-inc-detail.component';
import { DepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';

describe('Component Tests', () => {
  describe('DepartmentDeerInc Management Detail Component', () => {
    let comp: DepartmentDeerIncDetailComponent;
    let fixture: ComponentFixture<DepartmentDeerIncDetailComponent>;
    const route = ({ data: of({ department: new DepartmentDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [DepartmentDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepartmentDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load department on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
