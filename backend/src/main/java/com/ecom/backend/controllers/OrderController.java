package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.OrderException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Address;
import com.ecom.backend.models.Order;
import com.ecom.backend.models.User;
import com.ecom.backend.services.OrderService;
import com.ecom.backend.services.UserService;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestBody Address shippingAddress, @RequestHeader("Authorization") String jwt) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);

        Order order=orderService.createOrder(user,shippingAddress);

        return new ResponseEntity<>(order, HttpStatus.CREATED);

    }

    @GetMapping("/")
    public  ResponseEntity<List<Order>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);

        List<Order> orders=orderService.userOrderHistory(user.getId());

        return new ResponseEntity<>(orders,HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId, @RequestHeader("Authorization") String jwt) throws UserException, OrderException{

//        User user=userService.findUserProfileByJwt(jwt);

        Order order=orderService.findOrderById(orderId);

        return new ResponseEntity<>(order,HttpStatus.OK);

    }

}
