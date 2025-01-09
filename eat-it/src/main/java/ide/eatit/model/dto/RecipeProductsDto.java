package ide.eatit.model.dto;

import java.util.ArrayList;
import java.util.List;

public class RecipeProductsDto {
    private Integer recipeId;
    private List<ExtendedProductDto> products;

    public RecipeProductsDto() {
        this.products = new ArrayList<>();
    }

    public RecipeProductsDto(Integer recipeId, List<ExtendedProductDto> products) {
        this.recipeId = recipeId;
        this.products = products;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public List<ExtendedProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<ExtendedProductDto> products) {
        this.products = products;
    }
}
