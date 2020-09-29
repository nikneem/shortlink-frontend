export class ShortLinkUpdateDto {
  public id: string;
  public endpointUrl: string;
  public shortCode: string;
  public expirationOn: Date;

  constructor(init?: Partial<ShortLinkUpdateDto>) {
    Object.assign(this, init);
  }
}

export class HourlyHitsDto {
  public start: Date;
  public hour: string;
  public hits: number;

  constructor(init?: Partial<HourlyHitsDto>) {
    Object.assign(this, init);
  }
}
export class DailyHitsDto {
  public start: Date;
  public hits: number;

  constructor(init?: Partial<DailyHitsDto>) {
    Object.assign(this, init);
  }
}

export class ChartPointDto {
  public x: string;
  public y: number;

  constructor(init?: Partial<ChartPointDto>) {
    Object.assign(this, init);
  }
}
