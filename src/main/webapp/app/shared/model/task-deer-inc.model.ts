import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';

export interface ITaskDeerInc {
  id?: number;
  title?: string;
  description?: string;
  jobs?: IJobDeerInc[];
}

export class TaskDeerInc implements ITaskDeerInc {
  constructor(public id?: number, public title?: string, public description?: string, public jobs?: IJobDeerInc[]) {}
}
