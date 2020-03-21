import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { EmployeeDeerIncUpdateComponent } from 'app/entities/employee-deer-inc/employee-deer-inc-update.component';
import { EmployeeDeerIncService } from 'app/entities/employee-deer-inc/employee-deer-inc.service';
import { EmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';

describe('Component Tests', () => {
  describe('EmployeeDeerInc Management Update Component', () => {
    let comp: EmployeeDeerIncUpdateComponent;
    let fixture: ComponentFixture<EmployeeDeerIncUpdateComponent>;
    let service: EmployeeDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [EmployeeDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeDeerInc(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeDeerInc();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
