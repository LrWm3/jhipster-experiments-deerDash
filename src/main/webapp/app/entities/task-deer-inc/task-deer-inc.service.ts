import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITaskDeerInc } from 'app/shared/model/task-deer-inc.model';

type EntityResponseType = HttpResponse<ITaskDeerInc>;
type EntityArrayResponseType = HttpResponse<ITaskDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class TaskDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/tasks';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tasks';

  constructor(protected http: HttpClient) {}

  create(task: ITaskDeerInc): Observable<EntityResponseType> {
    return this.http.post<ITaskDeerInc>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITaskDeerInc): Observable<EntityResponseType> {
    return this.http.put<ITaskDeerInc>(this.resourceUrl, task, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
