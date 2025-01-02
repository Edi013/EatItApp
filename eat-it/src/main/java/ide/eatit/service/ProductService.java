package ide.eatit.service;

import ide.eatit.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ProductService {
    @Autowired
    private ProductRepository productRepository;
}
