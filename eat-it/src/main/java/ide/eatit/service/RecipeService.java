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
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Transactional
    public Recipe createRecipe(RecipeDto recipe) {
        Recipe recipeEntity = new Recipe();
        recipeEntity.setName(recipe.getName());
        recipeEntity.setDescription(recipe.getDescription());
        var createdBy = userRepository.findById(UUID.fromString(recipe.getCreatedBy()));
        createdBy.ifPresent(recipeEntity::setCreatedBy);

        return recipeRepository.save(recipeEntity);
    }

    //@Transactional(readOnly = true)
    public List<Recipe> getAllRecipes() {
        var a = recipeRepository.findAll();
       return a;
    }

    @Transactional(readOnly = true)
    public List<Recipe> getAllRecipesByOwner(String userId) {
        Optional<User> userOptional = userRepository.findById(UUID.fromString(userId));
        if(userOptional.isPresent()) {
            return recipeRepository.findByCreatedBy(userOptional.get());
        }

        throw new RuntimeException(String.format("User not found, id %s", userId));
    }

    @Transactional(readOnly = true)
    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }

    @Transactional
    public Recipe updateRecipe(Integer id, RecipeDto recipeDetails) {
        Optional<Recipe> existingRecipeOptional = recipeRepository.findById(id);
        if (existingRecipeOptional.isEmpty()) {
            logger.error("Recipe not found while updating, id {}", id);
            return null;
        }

        Recipe existingRecipe = existingRecipeOptional.get();
        existingRecipe.setName(recipeDetails.getName());
        existingRecipe.setDescription(recipeDetails.getDescription());
        return recipeRepository.save(existingRecipe);
    }

    @Transactional
    public boolean deleteRecipe(Integer id) {
        Optional<Recipe> existingRecipeOptional = recipeRepository.findById(id);
        if (existingRecipeOptional.isPresent()) {
            recipeRepository.deleteById(id);
            return true;
        } else {
            logger.error("Recipe not found while deleting, id {}", id);
            return false;
        }
    }
}
