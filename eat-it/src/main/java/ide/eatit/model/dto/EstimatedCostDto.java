package ide.eatit.model.dto;

import java.math.BigDecimal;

public class EstimatedCostDto {

    private Integer recipeId;
    private BigDecimal estimatedCost;

    // Constructor
    public EstimatedCostDto(Integer recipeId, BigDecimal estimatedCost) {
        this.recipeId = recipeId;
        this.estimatedCost = estimatedCost;
    }

    // Getters and Setters
    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public BigDecimal getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(BigDecimal estimatedCost) {
        this.estimatedCost = estimatedCost;
    }
}
