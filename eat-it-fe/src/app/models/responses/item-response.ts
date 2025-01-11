import { BaseResponse } from "./base-response";

export class ItemResponse<T> extends BaseResponse {
  item: T;

  constructor(statusCode: string, message: string, status: string, item: T) {
    super(statusCode, message, status);
    this.item = item;
  }

  static override failedResponse<Z>(message: string = "", statusCode: string = '500'): ItemResponse<Z> {
    return new ItemResponse<Z>(statusCode, "Failed to ItemResponse. " + message, 'FAILED', Object.create(null));
  }
}