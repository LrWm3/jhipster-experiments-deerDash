import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DeerDashTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { JobDeerIncDeleteDialogComponent } from 'app/entities/job-deer-inc/job-deer-inc-delete-dialog.component';
import { JobDeerIncService } from 'app/entities/job-deer-inc/job-deer-inc.service';

describe('Component Tests', () => {
  describe('JobDeerInc Management Delete Component', () => {
    let comp: JobDeerIncDeleteDialogComponent;
    let fixture: ComponentFixture<JobDeerIncDeleteDialogComponent>;
    let service: JobDeerIncService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [JobDeerIncDeleteDialogComponent]
      })
        .overrideTemplate(JobDeerIncDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobDeerIncDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobDeerIncService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
