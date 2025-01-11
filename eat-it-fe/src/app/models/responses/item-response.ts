import { BaseResponse } from "./base-response";

export class ItemResponse<T> extends BaseResponse {
  item: T;

  constructor(statusCode: string, message: string, status: string, item: T) {
    super(statusCode, message, status);
    this.item = item;
  }
  static override failedResponse(message: string = "", statusCode: string = '500'): BaseResponse {
    return new BaseResponse(statusCode, "Login failed. " + message, 'FAILED');
  }
}