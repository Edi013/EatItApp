package ide.eatit.model.responses;

import java.util.List;

public class ItemsResponse<T> extends BaseResponse {

    private List<T> items;

    public ItemsResponse(String statusCode, String message, String status, List<T> items) {
        super(statusCode, message, status);
        this.items = items;
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }
}
