package ide.eatit.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import ide.eatit.model.User;
import ide.eatit.model.dto.AuthRequest;
import ide.eatit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

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

    public ResponseEntity<?> login(AuthRequest authRequest) {
        try {
            Optional<User> user = Optional.ofNullable(userRepository.getByUsername(authRequest.getUsername()));

            if (user.isEmpty()) {
                return ResponseEntity.status(401).body("Invalid credentials. Bad username.");
            }

            if (!hashPasswordWithSHA256(authRequest.getPassword()).equals(user.get().getPassword()))
                return ResponseEntity.status(401).body("Invalid credentials. Bad password.");

            //generate jwt and return

            return ResponseEntity.status(200).body("Login successful!");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred during login: " + e.getMessage());
        }
    }

    public ResponseEntity<?> register(AuthRequest authRequest) {
        try {
            if (userRepository.existsByUsername(authRequest.getUsername())) {
                return ResponseEntity.status(400).body("Username is already taken.");
            }

            User newUser = new User();
            newUser.setUsername(authRequest.getUsername());
            newUser.setPassword(hashPasswordWithSHA256(authRequest.getPassword()));
            userRepository.save(newUser);

            userRepository.flush();

            return ResponseEntity.status(201).body("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred during registration: " + e.getMessage());
        }
    }
}
