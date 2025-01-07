package ide.eatit.controller;

import ide.eatit.model.Recipe;
import ide.eatit.model.dto.RecipeDto;
import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.responses.GetAllResponse;
import ide.eatit.model.responses.GetResponse;
import ide.eatit.model.responses.recipe.RecipeResponse;
import ide.eatit.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    @Autowired
    public RecipeService recipeService;

    @GetMapping
    public GetAllResponse<RecipeDto> GetAll(){
        var recipesDto = recipeService.getAllRecipes()
                .stream()
                .map(Recipe::toDto)
                .toList();

        return new GetAllResponse<RecipeDto>(
                "200",
                "Recipe retrieved successfully.",
                "SUCCESS",
                recipesDto
        );
    }

    @GetMapping("/user/{userId}")
    public GetAllResponse<RecipeDto> GetAllByOwner(@PathVariable String userId){
        var recipesDto = recipeService.getAllRecipesByOwner(userId)
                .stream()
                .map(Recipe::toDto)
                .toList();

        return new GetAllResponse<RecipeDto>(
                "200",
                "Recipe retrieved successfully.",
                "SUCCESS",
                recipesDto
        );
    }

    @GetMapping("{id}")
    public BaseResponse GetById(@PathVariable String id){
        try{
            Integer idNumber = Integer.parseInt(id);

            var result = recipeService.getRecipeById(idNumber);
            if(result.isEmpty()){
                return new BaseResponse("404", "Recipe not found.", "FAILED");
            }

            return new GetResponse<RecipeDto>("200", "Recipe found.", "SUCCESS", result.get().toDto());
        }catch (NumberFormatException e){
            return new BaseResponse("400", "Recipe not found.", "FAILED");
        }
    }

    @PostMapping
    public BaseResponse insertRecipe(@RequestBody RecipeDto recipeDto) {
        Recipe insertedRecipe = recipeService.createRecipe(recipeDto);
        if (insertedRecipe == null) {
            return new BaseResponse("500", "Failed to insert recipe.", "FAILED");
        }
        return new RecipeResponse("200", "Recipe inserted.", "SUCCESS", insertedRecipe.toDto());
    }

    @PutMapping("/{id}")
    public BaseResponse updateRecipe(@PathVariable Long id, @RequestBody RecipeDto recipeDto) {
        var result = recipeService.updateRecipe(recipeDto.getId(), recipeDto);
        if(result == null){
            return new BaseResponse("400", String.format("Recipe not found with id: %d", recipeDto.getId()), "SUCCESS");
        }
        return new RecipeResponse("200", "Recipe Updated", "SUCCESS", result.toDto());
    }

    @DeleteMapping("/{id}")
    public BaseResponse deleteRecipe(@PathVariable Integer id) {
        if(recipeService.deleteRecipe(id)){
            return new BaseResponse("400", String.format("Recipe not found with id: %d", id), "SUCCESS");
        }

        return new BaseResponse("200", "Recipe Deleted", "SUCCESS");
    }
}
