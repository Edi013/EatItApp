package ide.eatit.service;

import ide.eatit.model.Product;
import ide.eatit.model.Recipe;
import ide.eatit.model.RecipeProduct;
import ide.eatit.repository.ProductRepository;
import ide.eatit.repository.RecipeProductRepository;
import ide.eatit.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeProductService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RecipeProductRepository recipeProductRepository;

    private static final Logger logger = LoggerFactory.getLogger(RecipeProductService.class);

    @Transactional()
    List<RecipeProduct> addProductsToRecipe(Integer recipeId, List<Integer> productsIds, List<Integer> productsQuantities){
        List<RecipeProduct> result = new ArrayList<>();
        Recipe recipe = getRecipeById(recipeId);

        for (int i = 0; i < productsIds.size(); i++) {
            Integer productId = productsIds.get(i);
            Integer productQuantity = productsQuantities.get(i);

            // You can now use productId and productQuantity for each iteration
            result.add(createProductRecipe(getProductById(productId), recipe, productQuantity));
        }
        return result;
    }

    @Transactional
    public RecipeProduct addProductToRecipe(Integer recipeId, Integer productId, Integer productQuantity) {
        return createProductRecipe(getProductById(productId), getRecipeById(recipeId), productQuantity);
    }

    private RecipeProduct createProductRecipe(Product product, Recipe recipe, Integer productQuantity) {
        RecipeProduct recipeProducts = new RecipeProduct();
        recipeProducts.setProduct(product);
        recipeProducts.setRecipe(recipe);
        recipeProducts.setQuantity(productQuantity);
        recipeProductRepository.save(recipeProducts);
        return recipeProducts;
    }

    private Product getProductById(Integer productId) {
        return productRepository.findById(productId)
                .orElseThrow(() ->{
                    logger.error("Adding products to a recipe, but product not found.");
                    return new RuntimeException("Product not found");
                });
    }

    private Recipe getRecipeById(Integer recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() ->{
                    logger.error("Adding products to a recipe, but recipe not found.");
                    return new RuntimeException("Recipe not found");
                });
    }
}
