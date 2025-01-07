import { BaseResponse } from "./base-response";

export class LoginResponse extends BaseResponse{
  constructor(
      statusCode: string,
      message: string,
      status: string,
      public token: string
  ) {
    super(statusCode, message, status);  
    token = token ?? "";
  }

  static override failedResponse(message: string = ""): LoginResponse {
    return new this('500', "Login failed. " + message, 'FAILED', "");
  }
}