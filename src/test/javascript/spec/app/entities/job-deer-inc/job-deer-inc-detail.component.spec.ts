import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeerDashTestModule } from '../../../test.module';
import { JobDeerIncDetailComponent } from 'app/entities/job-deer-inc/job-deer-inc-detail.component';
import { JobDeerInc } from 'app/shared/model/job-deer-inc.model';

describe('Component Tests', () => {
  describe('JobDeerInc Management Detail Component', () => {
    let comp: JobDeerIncDetailComponent;
    let fixture: ComponentFixture<JobDeerIncDetailComponent>;
    const route = ({ data: of({ job: new JobDeerInc(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DeerDashTestModule],
        declarations: [JobDeerIncDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(JobDeerIncDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobDeerIncDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load job on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
