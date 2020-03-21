import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { LocationDeerIncUpdateComponent } from 'app/entities/location-deer-inc/location-deer-inc-update.component';
import { LocationDeerIncService } from 'app/entities/location-deer-inc/location-deer-inc.service';
import { LocationDeerInc } from 'app/shared/model/location-deer-inc.model';

describe('Component Tests', () => {
  describe('LocationDeerInc Management Update Component', () => {
    let comp: LocationDeerIncUpdateComponent;
    let fixture: ComponentFixture<LocationDeerIncUpdateComponent>;
    let service: LocationDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [LocationDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LocationDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocationDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocationDeerInc(123);
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
        const entity = new LocationDeerInc();
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
