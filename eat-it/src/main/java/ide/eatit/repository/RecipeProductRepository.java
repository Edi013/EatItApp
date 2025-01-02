package ide.eatit.repository;

import ide.eatit.model.RecipeProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeProductRepository extends JpaRepository<RecipeProduct, Integer> {
    List<RecipeProduct> findByRecipeId(Integer recipeId);
    public RecipeProduct addProductsToRecipeByReceipeId(Integer recipeId, List<Integer> productsIds);
    public RecipeProduct addProductToRecipeByReceipeId(Integer recipeId, Integer productId);
}
