package ide.eatit.repository;

import ide.eatit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    User getByUsername(String username);
}
