package ide.eatit.repository;

import ide.eatit.model.Recipe;
import ide.eatit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByCreatedBy(User createdBy);
}
