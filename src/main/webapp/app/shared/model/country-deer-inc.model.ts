export interface ICountryDeerInc {
  id?: number;
  countryName?: string;
  regionId?: number;
}

export class CountryDeerInc implements ICountryDeerInc {
  constructor(public id?: number, public countryName?: string, public regionId?: number) {}
}
