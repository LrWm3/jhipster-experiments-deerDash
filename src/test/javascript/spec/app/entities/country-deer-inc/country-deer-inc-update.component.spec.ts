import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { CountryDeerIncUpdateComponent } from 'app/entities/country-deer-inc/country-deer-inc-update.component';
import { CountryDeerIncService } from 'app/entities/country-deer-inc/country-deer-inc.service';
import { CountryDeerInc } from 'app/shared/model/country-deer-inc.model';

describe('Component Tests', () => {
  describe('CountryDeerInc Management Update Component', () => {
    let comp: CountryDeerIncUpdateComponent;
    let fixture: ComponentFixture<CountryDeerIncUpdateComponent>;
    let service: CountryDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [CountryDeerIncUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CountryDeerIncUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountryDeerIncUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountryDeerIncService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CountryDeerInc(123);
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
        const entity = new CountryDeerInc();
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
