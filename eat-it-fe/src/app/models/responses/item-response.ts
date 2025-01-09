import { BaseResponse } from "./base-response";

export class ItemResponse<T> extends BaseResponse {
  item: T;

  constructor(statusCode: string, message: string, status: string, item: T) {
    super(statusCode, message, status);
    this.item = item;
  }
  static override failedResponse(message: string = ""): ItemResponse<null> {
    return new this('500', "Login failed. " + message, 'FAILED', null);
  }
}
