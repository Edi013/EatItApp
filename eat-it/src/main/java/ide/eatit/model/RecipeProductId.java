package ide.eatit.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecipeProductId implements Serializable {

    private Integer recipeId;
    private Integer productId;

    public RecipeProductId() {}

    public RecipeProductId(Integer recipeId, Integer productId) {
        this.recipeId = recipeId;
        this.productId = productId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeProductId that = (RecipeProductId) o;
        return Objects.equals(recipeId, that.recipeId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, productId);
    }
}
