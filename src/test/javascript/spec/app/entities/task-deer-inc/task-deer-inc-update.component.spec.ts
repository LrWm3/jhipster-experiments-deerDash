import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { TaskDeerIncUpdateComponent } from 'app/entities/task-deer-inc/task-deer-inc-update.component';
import { TaskDeerIncService } from 'app/entities/task-deer-inc/task-deer-inc.service';
import { TaskDeerInc } from 'app/shared/model/task-deer-inc.model';

describe('Component Tests', () => {
  describe('TaskDeerInc Management Update Component', () => {
    let comp: TaskDeerIncUpdateComponent;
    let fixture: ComponentFixture<TaskDeerIncUpdateComponent>;
    let service: TaskDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [TaskDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TaskDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaskDeerInc(123);
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
        const entity = new TaskDeerInc();
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
