package ide.eatit.controller;


import ide.eatit.model.Product;
import ide.eatit.model.Recipe;
import ide.eatit.model.dto.ProductRecipeQuantityDto;
import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.responses.ItemResponse;
import ide.eatit.service.ProductService;
import ide.eatit.service.RecipeProductService;
import ide.eatit.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/recipe/details")
public class RecipeProductController {
    @Autowired
    private RecipeProductService recipeProductService;

    @Autowired
    private ProductService productService;

    @Autowired
    public RecipeService recipeService;

    @GetMapping("/cost/{recipeId}")
    public BaseResponse getCostByRecipeId(@PathVariable("recipeId") int recipeId) {
        var result = recipeProductService.findEstimatedCostByRecipeId(recipeId);

        if(result == null)
            return new BaseResponse("400", String.format("Recipe with id %s was not found", recipeId), "FAILED");

        return new ItemResponse<>("200", "Cost calculation completed.", "SUCCESS", result);
    }

    @GetMapping("/products/{recipeId}")
    public BaseResponse getProductsByRecipeId(@PathVariable("recipeId") int recipeId) {
        var result = recipeProductService.getProductsForRecipeById(recipeId);

        if(result == null)
            return new BaseResponse("400", String.format("Recipe with id %s was not found", recipeId), "FAILED");

        return new ItemResponse<>("200", "Cost calculation completed.", "SUCCESS", result);
    }

    @PostMapping()
    public BaseResponse putProductOnRecipe(@RequestBody ProductRecipeQuantityDto dto) {
        Optional<Product> product = productService.getProductById(dto.getProductId());
        if(product.isEmpty())  return new BaseResponse("400", "Product not found.", "FAILED");
        Optional<Recipe> recipe = recipeService.getRecipeById(dto.getRecipeId());
        if(recipe.isEmpty()) return new BaseResponse("400", "Recipe not found.", "FAILED");
        var insertedRecipe = recipeProductService.addProductToRecipe(dto.getRecipeId(), dto.getProductId(), dto.getQuantity());

        if (insertedRecipe == null) {
            return new BaseResponse("500", "Failed to insert product on recipe.", "FAILED");
        }
        return new BaseResponse("200", "Product assigned to recipe.", "SUCCESS");
    }


}
