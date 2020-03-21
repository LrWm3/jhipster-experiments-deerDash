import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { JobDeerIncUpdateComponent } from 'app/entities/job-deer-inc/job-deer-inc-update.component';
import { JobDeerIncService } from 'app/entities/job-deer-inc/job-deer-inc.service';
import { JobDeerInc } from 'app/shared/model/job-deer-inc.model';

describe('Component Tests', () => {
  describe('JobDeerInc Management Update Component', () => {
    let comp: JobDeerIncUpdateComponent;
    let fixture: ComponentFixture<JobDeerIncUpdateComponent>;
    let service: JobDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [JobDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(JobDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobDeerInc(123);
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
        const entity = new JobDeerInc();
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
