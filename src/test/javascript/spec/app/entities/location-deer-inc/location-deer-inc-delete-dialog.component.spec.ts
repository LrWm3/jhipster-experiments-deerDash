import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DeerDashTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { LocationDeerIncDeleteDialogComponent } from 'app/entities/location-deer-inc/location-deer-inc-delete-dialog.component';
import { LocationDeerIncService } from 'app/entities/location-deer-inc/location-deer-inc.service';

describe('Component Tests', () => {
  describe('LocationDeerInc Management Delete Component', () => {
    let comp: LocationDeerIncDeleteDialogComponent;
    let fixture: ComponentFixture<LocationDeerIncDeleteDialogComponent>;
    let service: LocationDeerIncService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [LocationDeerIncDeleteDialogComponent]
      })
        .overrideTemplate(LocationDeerIncDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocationDeerIncDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationDeerIncService);
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
