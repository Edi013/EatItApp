package ide.eatit.model.responses;

public class BaseResponse {

    private String statusCode;
    private String message;
    private String status;

    public BaseResponse(String statusCode, String message, String status) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = status;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "BaseResponse{" +
                "statusCode='" + statusCode + '\'' +
                ", message='" + message + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

