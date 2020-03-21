import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { DepartmentDeerIncUpdateComponent } from 'app/entities/department-deer-inc/department-deer-inc-update.component';
import { DepartmentDeerIncService } from 'app/entities/department-deer-inc/department-deer-inc.service';
import { DepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';

describe('Component Tests', () => {
  describe('DepartmentDeerInc Management Update Component', () => {
    let comp: DepartmentDeerIncUpdateComponent;
    let fixture: ComponentFixture<DepartmentDeerIncUpdateComponent>;
    let service: DepartmentDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [DepartmentDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DepartmentDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentDeerInc(123);
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
        const entity = new DepartmentDeerInc();
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
