import { Moment } from 'moment';
import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';

export interface IEmployeeDeerInc {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  jobs?: IJobDeerInc[];
  managers?: IEmployeeDeerInc[];
  departmentId?: number;
  teamMembers?: IEmployeeDeerInc[];
}

export class EmployeeDeerInc implements IEmployeeDeerInc {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public jobs?: IJobDeerInc[],
    public managers?: IEmployeeDeerInc[],
    public departmentId?: number,
    public teamMembers?: IEmployeeDeerInc[]
  ) {}
}
