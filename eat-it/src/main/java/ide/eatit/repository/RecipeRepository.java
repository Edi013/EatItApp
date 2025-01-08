package ide.eatit.repository;

import ide.eatit.model.Recipe;
import ide.eatit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
   // List<Recipe> findByCreatedBy(User createdBy);
   //@Query("SELECT r FROM Recipe r WHERE r.createdBy = :createdBy")
   List<Recipe> findByCreatedBy(User createdBy);

//    @Override
//    @Query("SELECT r FROM Recipe r")
//    List<Recipe> findAll();
}
