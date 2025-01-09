package ide.eatit.model.dto;

public class ProductRecipeQuantityDto {

    private Integer recipeId;
    private Integer productId;
    private Integer quantity;

    public ProductRecipeQuantityDto() {
    }

    public ProductRecipeQuantityDto(Integer recipeId, Integer productId, Integer quantity) {
        this.recipeId = recipeId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "RecipeProductDto{" +
                "recipeId=" + recipeId +
                ", productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
