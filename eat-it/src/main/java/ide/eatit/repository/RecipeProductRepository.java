package ide.eatit.repository;

import ide.eatit.model.RecipeProduct;
import ide.eatit.model.dto.EstimatedCostDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeProductRepository extends JpaRepository<RecipeProduct, Integer> {
    List<RecipeProduct> findByRecipeId(Integer recipeId);

    @Query("SELECT new ide.eatit.model.dto.EstimatedCostDto(rp.recipe.id, SUM(CAST(rp.quantity * p.value AS DOUBLE))) " +
            "FROM RecipeProduct rp " +
            "JOIN rp.product p " +
            "WHERE rp.recipe.id = :recipeId " +
            "GROUP BY rp.recipe.id")
    List<EstimatedCostDto> findEstimatedCostByRecipeId(@Param("recipeId") Integer recipeId);

}
