export class BaseResponse {
    constructor(
      public statusCode: string,
      public message: string,
      public status: string
    ) {}
  
    static failedResponse(message: string = ""): BaseResponse {
      return new this('500', "BE response was unexpected." + message, 'FAILED');
    }

    hasFailed(): boolean{
      if(this.statusCode.length === 3)
      {
        var is2xxStatusCode = this.statusCode[0] !== "2";
        return is2xxStatusCode;
      }

      this.message = this.message + "Unexpected/failed status code returned.";
      return true;
    }


    public handleMessageByStatusCode(): string {
      const regex2xx = /^2\d{1}/;  
      const regex4xx = /^4\d{1}/;  
      const regex5xx = /^5\d{1}/;  
    
      if (regex2xx.test(this.statusCode)) {
        return 'Success!';
      } else if (regex4xx.test(this.statusCode)) {
        return 'Failed. You did something wrong.';
      } else if (regex5xx.test(this.statusCode)) {
        return 'Service Unavailable! One of our services is currently down. Please try again later.';
      } else {
        return 'Service Unavailable. One of our services is currently down. Please try again later.';
      }
    }
    
  }
  