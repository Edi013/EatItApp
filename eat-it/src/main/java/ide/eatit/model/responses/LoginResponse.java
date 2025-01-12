package ide.eatit.model.responses;

public class LoginResponse extends BaseResponse {

    private String token;
    private String userId;
    private String username;

    public LoginResponse(String statusCode, String message, String status, String token, String userId, String username) {
        super(statusCode, message, status);
        this.token = token;
        this.userId = userId;
        this.username = username;
    }

    public LoginResponse(String statusCode, String message, String status) {
        this(statusCode, message, status, "", "", "");
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "statusCode='" + getStatusCode() + '\'' +
                ", message='" + getMessage() + '\'' +
                ", status='" + getStatus() + '\'' +
                ", token='" + token + '\'' +
                ", userId='" + userId + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}

