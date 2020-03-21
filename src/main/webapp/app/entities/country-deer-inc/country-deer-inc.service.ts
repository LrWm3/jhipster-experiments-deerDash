import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ICountryDeerInc } from 'app/shared/model/country-deer-inc.model';

type EntityResponseType = HttpResponse<ICountryDeerInc>;
type EntityArrayResponseType = HttpResponse<ICountryDeerInc[]>;

@Injectable({ providedIn: 'root' })
export class CountryDeerIncService {
  public resourceUrl = SERVER_API_URL + 'api/countries';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/countries';

  constructor(protected http: HttpClient) {}

  create(country: ICountryDeerInc): Observable<EntityResponseType> {
    return this.http.post<ICountryDeerInc>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryDeerInc): Observable<EntityResponseType> {
    return this.http.put<ICountryDeerInc>(this.resourceUrl, country, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryDeerInc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryDeerInc[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryDeerInc[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
