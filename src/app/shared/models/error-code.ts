export class ErrorCodeDto {
  public code: string;
  public description: string;
  public translationKey: string;

  constructor(init?: Partial<ErrorCodeDto>) {
    Object.assign(this, init);
  }
}
