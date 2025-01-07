package ide.eatit.model.responses;

import java.util.List;

public class GetResponse<T> extends BaseResponse {

    private T item;

    public GetResponse(String statusCode, String message, String status, T item) {
        super(statusCode, message, status);
        this.item = item;
    }

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }
}
