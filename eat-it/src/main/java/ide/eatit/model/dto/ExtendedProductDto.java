package ide.eatit.model.dto;

public class ExtendedProductDto extends ProductDto {

    private Integer quantity;

    public ExtendedProductDto(Integer id, String name, double value, Integer quantity) {
        super(id, name, value);
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
