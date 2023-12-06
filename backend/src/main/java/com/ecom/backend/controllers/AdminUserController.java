package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.User;
import com.ecom.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getAllUsers(@RequestHeader("Authorization") String jwt) throws UserException {
        return userService.getAllUsers();
    }
}
