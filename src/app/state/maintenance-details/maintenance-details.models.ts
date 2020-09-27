export class ShortLinkUpdateDto {
  public id: string;
  public endpointUrl: string;
  public shortCode: string;
  public expirationOn: Date;

  constructor(init?: Partial<ShortLinkUpdateDto>) {
    Object.assign(this, init);
  }
}
