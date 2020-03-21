import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DeerDashTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { EmployeeDeerIncDeleteDialogComponent } from 'app/entities/employee-deer-inc/employee-deer-inc-delete-dialog.component';
import { EmployeeDeerIncService } from 'app/entities/employee-deer-inc/employee-deer-inc.service';

describe('Component Tests', () => {
  describe('EmployeeDeerInc Management Delete Component', () => {
    let comp: EmployeeDeerIncDeleteDialogComponent;
    let fixture: ComponentFixture<EmployeeDeerIncDeleteDialogComponent>;
    let service: EmployeeDeerIncService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [EmployeeDeerIncDeleteDialogComponent]
      })
        .overrideTemplate(EmployeeDeerIncDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeDeerIncDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeDeerIncService);
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
