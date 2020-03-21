import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { RegionDeerIncUpdateComponent } from 'app/entities/region-deer-inc/region-deer-inc-update.component';
import { RegionDeerIncService } from 'app/entities/region-deer-inc/region-deer-inc.service';
import { RegionDeerInc } from 'app/shared/model/region-deer-inc.model';

describe('Component Tests', () => {
  describe('RegionDeerInc Management Update Component', () => {
    let comp: RegionDeerIncUpdateComponent;
    let fixture: ComponentFixture<RegionDeerIncUpdateComponent>;
    let service: RegionDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [RegionDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RegionDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RegionDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RegionDeerInc(123);
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
        const entity = new RegionDeerInc();
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
