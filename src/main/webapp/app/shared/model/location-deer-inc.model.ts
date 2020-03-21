export interface ILocationDeerInc {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryId?: number;
}

export class LocationDeerInc implements ILocationDeerInc {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public countryId?: number
  ) {}
}
