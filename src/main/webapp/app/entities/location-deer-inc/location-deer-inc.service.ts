import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ILocationDeerInc } from 'app/shared/model/location-deer-inc.model';

type EntityResponseType = HttpResponse<ILocationDeerInc>;
type EntityArrayResponseType = HttpResponse<ILocationDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class LocationDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/locations';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/locations';

  constructor(protected http: HttpClient) {}

  create(location: ILocationDeerInc): Observable<EntityResponseType> {
    return this.http.post<ILocationDeerInc>(this.resourceUrl, location, { observe: 'response' });
  }

  update(location: ILocationDeerInc): Observable<EntityResponseType> {
    return this.http.put<ILocationDeerInc>(this.resourceUrl, location, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocationDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocationDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocationDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
