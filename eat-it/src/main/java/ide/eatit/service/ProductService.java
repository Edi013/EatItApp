package ide.eatit.service;

import ide.eatit.model.Product;
import ide.eatit.model.dto.ProductDto;
import ide.eatit.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Transactional
    public Product createProduct(ProductDto product) {
        Product newProduct = new Product();
        newProduct.setName(product.getName());
        newProduct.setValue(product.getValue());
        return productRepository.save(newProduct);
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Product updateProduct(Integer id, Product productDetails) {
        Optional<Product> existingProductOptional = productRepository.findById(id);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setName(productDetails.getName());
            existingProduct.setValue(productDetails.getValue());

            return productRepository.save(existingProduct);
        } else {
            logger.error("Product not found while updating, id {}", id);
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

    @Transactional
    public void deleteProduct(Integer id) {
        Optional<Product> existingProductOptional = productRepository.findById(id);
        if (existingProductOptional.isPresent()) {
            productRepository.deleteById(id);
        } else {
            logger.error("Product not found while deleting, id {}", id);
            throw new RuntimeException("Product not found with id: " + id);
        }
    }
}
