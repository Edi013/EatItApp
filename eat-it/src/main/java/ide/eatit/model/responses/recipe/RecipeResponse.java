package ide.eatit.model.responses.recipe;

import ide.eatit.model.dto.RecipeDto;
import ide.eatit.model.responses.BaseResponse;

public class RecipeResponse extends BaseResponse {

    private RecipeDto recipe;

    public RecipeResponse(String statusCode, String message, String status, RecipeDto recipe) {
        super(statusCode, message, status);
        this.recipe = recipe;
    }
    public RecipeDto getRecipe() {
        return recipe;
    }
    public void setRecipe(RecipeDto recipe) {
        this.recipe = recipe;
    }
}
