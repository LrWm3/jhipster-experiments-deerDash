import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { JobHistoryDeerIncDetailComponent } from 'app/entities/job-history-deer-inc/job-history-deer-inc-detail.component';
import { JobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';

describe('Component Tests', () => {
  describe('JobHistoryDeerInc Management Detail Component', () => {
    let comp: JobHistoryDeerIncDetailComponent;
    let fixture: ComponentFixture<JobHistoryDeerIncDetailComponent>;
    const route = ({ data: of({ jobHistory: new JobHistoryDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [JobHistoryDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(JobHistoryDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobHistoryDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jobHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
