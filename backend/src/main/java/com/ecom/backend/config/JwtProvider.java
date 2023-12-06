package com.ecom.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {

    SecretKey key= Keys.hmacShaKeyFor(JwtConstants.SECRET_KEY.getBytes());

    public JwtProvider() {
    }

    public String generateToken(Authentication auth) {

        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+846000000))
                .claim("email",auth.getName())
                .signWith(key).compact();

    }

    public String getEmailFromToken(String jwt) {

        jwt=jwt.substring(7);

        Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        return String.valueOf(claims.get("email"));

    }

}
