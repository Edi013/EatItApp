package ide.eatit.repository;

import ide.eatit.model.RecipeProduct;
import ide.eatit.model.RecipeProductId;
import ide.eatit.model.dto.EstimatedCostDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeProductRepository extends JpaRepository<RecipeProduct, RecipeProductId> {
    List<RecipeProduct> findByRecipeId(Integer recipeId);
    @Query("SELECT new ide.eatit.model.dto.EstimatedCostDto(rp.recipe.id, SUM(CAST((rp.quantity / 100) * p.value AS DOUBLE))) " +
            "FROM RecipeProduct rp " +
            "JOIN rp.product p " +
            "WHERE rp.id.recipeId = :recipeId " +  
            "GROUP BY rp.recipe.id")
    EstimatedCostDto findEstimatedCostByRecipeId(@Param("recipeId") Integer recipeId);



    @Query("SELECT rp FROM RecipeProduct rp WHERE rp.recipe.id = :recipeId")
    List<RecipeProduct> findAllByRecipeId(@Param("recipeId") Integer recipeId);

    @Modifying
    @Query("UPDATE RecipeProduct rp SET rp.quantity = :quantity WHERE rp.id.recipeId = :recipeId AND rp.id.productId = :productId")
    void updateQuantityById(@Param("recipeId") Integer recipeId, @Param("productId") Integer productId, @Param("quantity") Integer quantity);
}
