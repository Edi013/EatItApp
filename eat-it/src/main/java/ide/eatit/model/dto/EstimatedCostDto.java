package ide.eatit.model.dto;

public class EstimatedCostDto {

    private Integer recipeId;
    private double estimatedCost;

    public EstimatedCostDto(Integer recipeId, double estimatedCost) {
        this.recipeId = recipeId;
        this.estimatedCost = estimatedCost;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }
}
