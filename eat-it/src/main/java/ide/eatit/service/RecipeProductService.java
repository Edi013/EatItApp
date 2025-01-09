package ide.eatit.service;

import ide.eatit.model.Product;
import ide.eatit.model.Recipe;
import ide.eatit.model.RecipeProduct;
import ide.eatit.model.RecipeProductId;
import ide.eatit.model.dto.EstimatedCostDto;
import ide.eatit.model.dto.ExtendedProductDto;
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

    @Transactional
    List<RecipeProduct> addProductsToRecipe(Integer recipeId, List<Integer> productsIds, List<Integer> productsQuantities){
        List<RecipeProduct> result = new ArrayList<>();
        Recipe recipe = getRecipeById(recipeId);

        for (int i = 0; i < productsIds.size(); i++) {
            Integer productId = productsIds.get(i);
            Integer productQuantity = productsQuantities.get(i);

            result.add(createProductRecipe(getProductById(productId), recipe, productQuantity));
        }
        return result;
    }

    @Transactional
    public RecipeProduct addProductToRecipe(Integer recipeId, Integer productId, Integer productQuantity) {
        return createProductRecipe(getProductById(productId), getRecipeById(recipeId), productQuantity);
    }

    @Transactional(readOnly = true)
    public EstimatedCostDto findEstimatedCostByRecipeId(Integer recipeId) {
        var recipe = recipeRepository.findById(recipeId);
        if(recipe.isEmpty()){return null;}

        var result = recipeProductRepository.findEstimatedCostByRecipeId(recipeId);
        if(result == null) {return new EstimatedCostDto(recipeId, 0.0);}
        return result ;
    }

    private RecipeProduct createProductRecipe(Product product, Recipe recipe, Integer productQuantity) {
        RecipeProductId recipeProductId = new RecipeProductId();
        recipeProductId.setRecipeId(recipe.getId());
        recipeProductId.setProductId(product.getId());

        RecipeProduct recipeProducts = new RecipeProduct();
        recipeProducts.setId(recipeProductId);
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

    public List<ExtendedProductDto> getProductsForRecipeById(Integer recipeId){
        if(recipeRepository.findById(recipeId).isEmpty()){return null;}

        List<RecipeProduct> result = recipeProductRepository.findAllByRecipeId(recipeId);
        List<ExtendedProductDto> products = new ArrayList<>();
        for(RecipeProduct entry : result){
            var product = entry.getProduct();
            products.add(new ExtendedProductDto(product.getId(), product.getName(), product.getValue(), entry.getQuantity()));
        }

        return products;
    }
}
