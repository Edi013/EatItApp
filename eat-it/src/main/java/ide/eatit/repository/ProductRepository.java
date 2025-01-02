package ide.eatit.repository;

import ide.eatit.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository  extends JpaRepository<Product, Integer> {
}
