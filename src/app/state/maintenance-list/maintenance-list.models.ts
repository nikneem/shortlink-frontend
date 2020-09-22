export class ShortLinkListItemDto {
  public id: string;
  public shortCode: string;
  public endpointUrl: string;
  public expirationOn?: Date;
  public totalHits: number;

  constructor(init?: Partial<ShortLinkListItemDto>) {
    Object.assign(this, init);
  }
}
