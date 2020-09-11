export class CreateNewShortLinkDto {
  public endpointUrl: string;

  constructor(init?: Partial<CreateNewShortLinkDto>) {
    Object.assign(this, init);
  }
}

export class ShortLinkDetailsDto {
  public id: string;
  public shortCode: string;
  public endpointUrl: string;
  public createdOn: Date;
  public expirationOn?: Date;
  public totalHits: number;

  constructor(init?: Partial<ShortLinkDetailsDto>) {
    Object.assign(this, init);
  }
}
