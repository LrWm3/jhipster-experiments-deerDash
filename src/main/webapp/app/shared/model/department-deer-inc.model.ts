import { IEmployeeDeerInc } from 'app/shared/model/employee-deer-inc.model';

export interface IDepartmentDeerInc {
  id?: number;
  departmentName?: string;
  locationId?: number;
  employees?: IEmployeeDeerInc[];
}

export class DepartmentDeerInc implements IDepartmentDeerInc {
  constructor(public id?: number, public departmentName?: string, public locationId?: number, public employees?: IEmployeeDeerInc[]) {}
}
