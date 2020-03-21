import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IJobHistoryDeerInc } from 'app/shared/model/job-history-deer-inc.model';

type EntityResponseType = HttpResponse<IJobHistoryDeerInc>;
type EntityArrayResponseType = HttpResponse<IJobHistoryDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class JobHistoryDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/job-histories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/job-histories';

  constructor(protected http: HttpClient) {}

  create(jobHistory: IJobHistoryDeerInc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .post<IJobHistoryDeerInc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(jobHistory: IJobHistoryDeerInc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .put<IJobHistoryDeerInc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJobHistoryDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJobHistoryDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJobHistoryDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(jobHistory: IJobHistoryDeerInc): IJobHistoryDeerInc {
    const copy: IJobHistoryDeerInc = Object.assign({}, jobHistory, {
      startDate: jobHistory.startDate && jobHistory.startDate.isValid() ? jobHistory.startDate.toJSON() : undefined,
      endDate: jobHistory.endDate && jobHistory.endDate.isValid() ? jobHistory.endDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((jobHistory: IJobHistoryDeerInc) => {
        jobHistory.startDate = jobHistory.startDate ? moment(jobHistory.startDate) : undefined;
        jobHistory.endDate = jobHistory.endDate ? moment(jobHistory.endDate) : undefined;
      });
    }
    return res;
  }
}
