import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IRegionDeerInc } from 'app/shared/model/region-deer-inc.model';

type EntityResponseType = HttpResponse<IRegionDeerInc>;
type EntityArrayResponseType = HttpResponse<IRegionDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class RegionDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/regions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/regions';

  constructor(protected http: HttpClient) {}

  create(region: IRegionDeerInc): Observable<EntityResponseType> {
    return this.http.post<IRegionDeerInc>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionDeerInc): Observable<EntityResponseType> {
    return this.http.put<IRegionDeerInc>(this.resourceUrl, region, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
