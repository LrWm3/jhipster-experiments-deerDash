import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { TaskDeerIncDetailComponent } from 'app/entities/task-deer-inc/task-deer-inc-detail.component';
import { TaskDeerInc } from 'app/shared/model/task-deer-inc.model';

describe('Component Tests', () => {
  describe('TaskDeerInc Management Detail Component', () => {
    let comp: TaskDeerIncDetailComponent;
    let fixture: ComponentFixture<TaskDeerIncDetailComponent>;
    const route = ({ data: of({ task: new TaskDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [TaskDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TaskDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaskDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load task on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
