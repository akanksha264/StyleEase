package com.ecom.backend.services;

import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.UserRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public User createUser(UserRequest request);

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public List<User> getAllUsers();

}
