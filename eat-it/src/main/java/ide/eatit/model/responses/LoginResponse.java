package ide.eatit.model.responses;

public class LoginResponse extends BaseResponse {

    private String token;

    public LoginResponse(String statusCode, String message, String status, String token) {
        super(statusCode, message, status);
        this.token = token;
    }

    public LoginResponse(String statusCode, String message, String status) {
        this(statusCode, message, status, "");
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "statusCode='" + getStatusCode() + '\'' +
                ", message='" + getMessage() + '\'' +
                ", status='" + getStatus() + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}

