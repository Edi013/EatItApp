import { BaseResponse } from "./base-response";

export class ItemsResponse<T> extends BaseResponse {
  items: T[];

  constructor(statusCode: string, message: string, status: string, items: T[]) {
    super(statusCode, message, status);
    this.items = items;
  }

  static override failedResponse(message: string = ""): ItemsResponse<null> {
    return new this('500', "BE response was unexpected." + message, 'FAILED', []);
  }
}
