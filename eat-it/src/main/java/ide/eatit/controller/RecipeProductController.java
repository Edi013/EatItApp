package ide.eatit.controller;


import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.responses.ItemResponse;
import ide.eatit.service.RecipeProductService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/recipe-cost")
public class RecipeProductController {
    @Autowired
    private RecipeProductService recipeProductService;

    @GetMapping("/{recipeId}")
    public BaseResponse findEstimatedCostByRecipeId(@PathVariable("recipeId") int recipeId) {
        var result = recipeProductService.findEstimatedCostByRecipeId(recipeId);

        if(result == null)
            return new BaseResponse("400", String.format("Recipe with id %s was not found", recipeId), "FAILED");

        return new ItemResponse<>("200", "Cost calculation completed.", "SUCCESS", result);
    }
}
