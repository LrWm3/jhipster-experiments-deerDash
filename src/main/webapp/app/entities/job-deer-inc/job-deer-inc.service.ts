import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IJobDeerInc } from 'app/shared/model/job-deer-inc.model';

type EntityResponseType = HttpResponse<IJobDeerInc>;
type EntityArrayResponseType = HttpResponse<IJobDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class JobDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/jobs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/jobs';

  constructor(protected http: HttpClient) {}

  create(job: IJobDeerInc): Observable<EntityResponseType> {
    return this.http.post<IJobDeerInc>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJobDeerInc): Observable<EntityResponseType> {
    return this.http.put<IJobDeerInc>(this.resourceUrl, job, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
