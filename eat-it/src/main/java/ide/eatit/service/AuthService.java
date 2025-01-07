package ide.eatit.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.User;
import ide.eatit.model.dto.AuthRequest;
import ide.eatit.model.responses.LoginResponse;
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

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

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
    public LoginResponse login(AuthRequest authRequest) {
        try {
            Optional<User> optionalUser = Optional.ofNullable(userRepository.getByUsername(authRequest.getUsername()));

            if (optionalUser.isEmpty()) {
                return new LoginResponse("401", "Invalid credentials. Bad username.", "SUCCESS.");
            }
            if (authRequest.getUsername().length() <4 ) {
                return new LoginResponse("400", "Username is too short", "SUCCESS.");
            }
            if (authRequest.getPassword().length() <4 ) {
                return new LoginResponse("400", "Password is too short", "SUCCESS.");
            }

            User user = optionalUser.get();
            if (!hashPasswordWithSHA256(authRequest.getPassword()).equals(user.getPassword())){
                return new LoginResponse("401", "Invalid credentials. Bad password.", "SUCCESS.");
            }


            String token = JwtUtil.generateToken(user.getUsername());

            logger.info("Login successful for user with name and id {} - {}", user.getUsername(), user.getId());
            return new LoginResponse("200", "Login succeeded. ",  "SUCCESS.", token);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new LoginResponse("500", "Login failed. "+e.getMessage(), "FAILED. SERVER ERROR.");
        }
    }

    @Transactional()
    public BaseResponse register(AuthRequest authRequest) {
        try {
            if (userRepository.existsByUsername(authRequest.getUsername())) {
                return new BaseResponse("400", "Username is already taken", "SUCCESS.");
            }
            if (authRequest.getUsername().length() <4 ) {
                return new BaseResponse("400", "Username is too short", "SUCCESS.");
            }
            if (authRequest.getPassword().length() <4 ) {
                return new BaseResponse("400", "Password is too short", "SUCCESS.");
            }

            User newUser = new User();
            newUser.setId(UUID.randomUUID().toString());
            newUser.setUsername(authRequest.getUsername());
            newUser.setPassword(hashPasswordWithSHA256(authRequest.getPassword()));
            userRepository.save(newUser);

            userRepository.flush();

            logger.info("Register successful for user with name and id {} - {}", newUser.getUsername(), newUser.getId());
            return new BaseResponse("201", "User registered.", "SUCCESS");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return new BaseResponse("500", "User not registered. "+e.getMessage(), "FAILED. SERVER ERROR.");
        }
    }
}
