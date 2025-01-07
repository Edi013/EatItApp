package ide.eatit.controller;

import ide.eatit.model.dto.AuthRequest;
import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.responses.LoginResponse;
import ide.eatit.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest authRequest) {
       return authService.login(authRequest);
    }

    @PostMapping("/register")
    public BaseResponse register(@RequestBody AuthRequest authRequest) {
        return authService.register(authRequest);
    }
}