export interface IRegionDeerInc {
  id?: number;
  regionName?: string;
}

export class RegionDeerInc implements IRegionDeerInc {
  constructor(public id?: number, public regionName?: string) {}
}
