import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IDepartmentDeerInc } from 'app/shared/model/department-deer-inc.model';

type EntityResponseType = HttpResponse<IDepartmentDeerInc>;
type EntityArrayResponseType = HttpResponse<IDepartmentDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/departments';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartmentDeerInc): Observable<EntityResponseType> {
    return this.http.post<IDepartmentDeerInc>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentDeerInc): Observable<EntityResponseType> {
    return this.http.put<IDepartmentDeerInc>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
