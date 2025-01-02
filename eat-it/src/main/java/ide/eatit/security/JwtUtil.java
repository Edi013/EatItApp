package ide.eatit.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "4r9g8hB9w6xP0yT2vQ1hE4zD7jK3nL8r9P2mL3zF8T9uF7w9bY0pX7uK3oT2nV";
    private static final long EXPIRATION_TIME = 86_400_000; // 10 days
    private static final Key SIGNING_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    /**
     * Generates a JWT token for a given username.
     *
     * @param username the username to include in the token
     * @return the generated JWT token
     */
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    /**
     * Extracts the username from a JWT token.
     *
     * @param token the JWT token
     * @return the username contained in the token
     */
    public static String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Validates the token without extracting claims explicitly.
     *
     * @param token the JWT token
     * @return true if the token is valid, false otherwise
     */
    public static boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SIGNING_KEY)
                    .build()
                    .parseClaimsJws(token);

            if(isTokenExpired(token))
                return false;

            return true;
        } catch (SignatureException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Extracts all claims from a JWT token.
     *
     * @param token the JWT token
     * @return the claims contained in the token
     */
    private static Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Checks if a token is expired.
     *
     * @param token the JWT token
     * @return true if the token is expired, false otherwise
     */
    public static boolean isTokenExpired(String token) {
        final Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }
}
