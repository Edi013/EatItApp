package ide.eatit.model.responses;

public class ItemResponse<T> extends BaseResponse {

    private T item;

    public ItemResponse(String statusCode, String message, String status, T item) {
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
