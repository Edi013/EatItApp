package ide.eatit.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String requestURI = request.getRequestURI();

        if (requestURI.contains("/auth") && (requestURI.contains("/register") || requestURI.contains("/login"))) {
            System.out.println("No JWT required on authentication routes. Forwarding the request.");
            chain.doFilter(request, response);
            return;
        }

        String bearerKeyword = "Bearer ";
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith(bearerKeyword)) {
            String token = header.substring(bearerKeyword.length());
            if (JwtUtil.validateToken(token)) {
                String username = JwtUtil.extractUsername(token);
                System.out.println("Valid token for user: " + username);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token");
                System.out.println("Invalid token for user.");
                return;
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing or invalid Authorization header");
            System.out.println("Missing token.");
            return;
        }

        chain.doFilter(request, response);
    }
}

