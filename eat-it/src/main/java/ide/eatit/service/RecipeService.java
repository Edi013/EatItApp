package ide.eatit.service;

import ide.eatit.model.Recipe;
import ide.eatit.model.User;
import ide.eatit.model.dto.RecipeDto;
import ide.eatit.repository.RecipeRepository;
import ide.eatit.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    public Recipe createRecipe(RecipeDto recipe) {
        Recipe recipeEntity = new Recipe();
        recipeEntity.setName(recipe.getName());
        recipeEntity.setDescription(recipe.getDescription());
        recipeEntity.setCreatedBy(recipe.getCreatedBy());

        return recipeRepository.save(recipeEntity);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getAllRecipesByOwner(String userId) {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));
        if(userOptional.isPresent()) {
            return recipeRepository.findByCreatedBy(userOptional.get());
        }

        throw new RuntimeException(String.format("User not found, id %s", userId));
    }

    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }

    public Recipe updateRecipe(Integer id, Recipe recipeDetails) {
        Optional<Recipe> existingRecipeOptional = recipeRepository.findById(id);
        if (existingRecipeOptional.isPresent()) {
            Recipe existingRecipe = existingRecipeOptional.get();
            existingRecipe.setName(recipeDetails.getName());
            existingRecipe.setDescription(recipeDetails.getDescription());

            return recipeRepository.save(existingRecipe);
        } else {
            logger.error("Recipe not found while updating, id {}", id);
            throw new RuntimeException("Recipe not found with id: " + id);
        }
    }

    public void deleteRecipe(Integer id) {
        Optional<Recipe> existingRecipeOptional = recipeRepository.findById(id);
        if (existingRecipeOptional.isPresent()) {
            recipeRepository.deleteById(id);
        } else {
            logger.error("Recipe not found while deleting, id {}", id);
            throw new RuntimeException("Recipe not found with id: " + id);
        }
    }
}
