import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';

export interface IJobDeerInc {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITaskDeerInc[];
  employeeId?: number;
}

export class JobDeerInc implements IJobDeerInc {
  constructor(
    public id?: number,
    public jobTitle?: string,
    public minSalary?: number,
    public maxSalary?: number,
    public tasks?: ITaskDeerInc[],
    public employeeId?: number
  ) {}
}
