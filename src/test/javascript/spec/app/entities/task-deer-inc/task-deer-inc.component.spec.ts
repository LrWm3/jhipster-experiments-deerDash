import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DeerDashTestModule } from '../../../test.module';
import { TaskDeerIncComponent } from 'app/entities/task-deer-inc/task-deer-inc.component';
import { TaskDeerIncService } from 'app/entities/task-deer-inc/task-deer-inc.service';
import { TaskDeerInc } from 'app/shared/model/task-deer-inc.model';

describe('Component Tests', () => {
  describe('TaskDeerInc Management Component', () => {
    let comp: TaskDeerIncComponent;
    let fixture: ComponentFixture<TaskDeerIncComponent>;
    let service: TaskDeerIncService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [TaskDeerIncComponent]
      })
        .overrideTemplate(TaskDeerIncComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskDeerIncComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaskDeerIncService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaskDeerInc(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tasks && comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
