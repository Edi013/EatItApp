package ide.eatit.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import ide.eatit.model.User;
import ide.eatit.model.dto.AuthRequest;
import ide.eatit.repository.UserRepository;
import ide.eatit.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserRepository.class);

    private String hashPasswordWithSHA256(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();

            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(AuthRequest authRequest) {
        try {
            Optional<User> optionalUser = Optional.ofNullable(userRepository.getByUsername(authRequest.getUsername()));

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid credentials. Bad username.");
            }

            User user = optionalUser.get();
            if (!hashPasswordWithSHA256(authRequest.getPassword()).equals(user.getPassword()))
                return ResponseEntity.status(401).body("Invalid credentials. Bad password.");

            String token = JwtUtil.generateToken(user.getUsername());

            logger.info("Login successful for user with name and id {} - {}", user.getUsername(), user.getId());
            return ResponseEntity.status(200).body(Map.of(
                    "status", "OK",
                    "statusCode", "200",
                    "message", "Login successful!",
                    "token", token
            ));
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(500).body("An error occurred during login: " + e.getMessage());
        }
    }

    @Transactional()
    public ResponseEntity<?> register(AuthRequest authRequest) {
        try {
            if (userRepository.existsByUsername(authRequest.getUsername())) {
                return ResponseEntity.status(400).body("Username is already taken.");
            }

            User newUser = new User();
            newUser.setId(UUID.randomUUID().toString());
            newUser.setUsername(authRequest.getUsername());
            newUser.setPassword(hashPasswordWithSHA256(authRequest.getPassword()));
            userRepository.save(newUser);

            userRepository.flush();

            logger.info("Register successful for user with name and id {} - {}", newUser.getUsername(), newUser.getId());
            return ResponseEntity.status(201).body("User registered successfully!");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(500).body("An error occurred during registration: " + e.getMessage());
        }
    }
}
