package com.ecom.backend.controllers;

import com.ecom.backend.config.JwtProvider;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.UserRepository;
import com.ecom.backend.requests.LoginRequest;
import com.ecom.backend.requests.UserRequest;
import com.ecom.backend.responses.AuthResponse;
import com.ecom.backend.services.CartService;
import com.ecom.backend.services.CustomUserServiceImplementation;
import com.ecom.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder;

    private final CustomUserServiceImplementation customUserServiceImplementation;

    private final CartService cartService;

    private final UserService userService;

    public AuthController(UserRepository userRepository, CustomUserServiceImplementation customUserServiceImplementation, PasswordEncoder passwordEncoder, JwtProvider jwtProvider, CartService cartService, UserService userService) {
        this.userRepository = userRepository;
        this.customUserServiceImplementation = customUserServiceImplementation;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody UserRequest request) throws UserException {

        String email=request.getEmail();

        if(userRepository.findByEmail(email)!=null){
            throw new UserException("Email already used by an Account");
        }

        User savedUser=userService.createUser(request);
        cartService.createCart(savedUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Successful");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {

        String username=loginRequest.getEmail();
        String password=loginRequest.getPassword();

        Authentication authentication=authenticate(username,password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signin Successful");

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails=customUserServiceImplementation.loadUserByUsername(username);

        if (userDetails==null){
            throw new BadCredentialsException("Invalid Username");
        }

        if (!passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }

    @DeleteMapping("/delete")
    public ResponseEntity<AuthResponse> deleteUser(@RequestHeader("Authorization") String jwt, @RequestBody LoginRequest request) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);

        Authentication authentication=authenticateDelete(user,request);
        System.out.println("2");

        user.getAddresses().clear();
        user.getPaymentInformations().clear();
        user.getRatings().clear();
        user.getReviews().clear();

        Cart cart=cartService.findUserCart(user.getId());
        cartService.deleteCart(cart);

        userRepository.delete(user);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Deletion Successful");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    private Authentication authenticateDelete(User user, LoginRequest request) {

        if (!user.getEmail().equals(request.getEmail())){
            throw new BadCredentialsException("Incorrect Username");
        }

        System.out.println(user.getPassword()+" vs "+request.getPassword());

        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }
        System.out.println("1");

        return new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());

    }

}
