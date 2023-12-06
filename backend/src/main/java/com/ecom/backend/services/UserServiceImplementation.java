package com.ecom.backend.services;

import com.ecom.backend.config.JwtProvider;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.UserRepository;
import com.ecom.backend.requests.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImplementation(JwtProvider jwtProvider, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(UserRequest request) {

        User createdUser=new User();

        createdUser.setEmail(request.getEmail());
        createdUser.setMobile(request.getMobile());
        createdUser.setPassword(passwordEncoder.encode(request.getPassword()));
        createdUser.setFirstName(request.getFirstName());
        createdUser.setLastName(request.getLastName());
        createdUser.setCreatedAt(LocalDateTime.now());

        User savedUser=userRepository.save(createdUser);

        return savedUser;
    }

    @Override
    public User findUserById(Long userId) throws UserException {

        Optional<User> user=userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        }

        throw new UserException("User id "+userId+" not found!");
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {

        String email=jwtProvider.getEmailFromToken(jwt);

        User user=userRepository.findByEmail(email);

        if(user!=null) {
            return user;
        }

        throw new UserException("User not found by email "+email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
