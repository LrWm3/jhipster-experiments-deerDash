import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { JobHistoryDeerIncUpdateComponent } from 'app/entities/job-history-deer-inc/job-history-deer-inc-update.component';
import { JobHistoryDeerIncService } from 'app/entities/job-history-deer-inc/job-history-deer-inc.service';
import { JobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';

describe('Component Tests', () => {
  describe('JobHistoryDeerInc Management Update Component', () => {
    let comp: JobHistoryDeerIncUpdateComponent;
    let fixture: ComponentFixture<JobHistoryDeerIncUpdateComponent>;
    let service: JobHistoryDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [JobHistoryDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(JobHistoryDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobHistoryDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new JobHistoryDeerInc(123);
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
        const entity = new JobHistoryDeerInc();
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
