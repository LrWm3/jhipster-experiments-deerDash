import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { EmployeeDeerIncDetailComponent } from 'app/entities/employee-deer-inc/employee-deer-inc-detail.component';
import { EmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';

describe('Component Tests', () => {
  describe('EmployeeDeerInc Management Detail Component', () => {
    let comp: EmployeeDeerIncDetailComponent;
    let fixture: ComponentFixture<EmployeeDeerIncDetailComponent>;
    const route = ({ data: of({ employee: new EmployeeDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [EmployeeDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load employee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
