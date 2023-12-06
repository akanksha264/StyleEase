package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.OrderException;
import com.ecom.backend.models.Order;
import com.ecom.backend.responses.ApiResponse;
import com.ecom.backend.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrders() {

        List<Order> orders=orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);

    }

    @PutMapping("/{orderId}/confirmed")
    public ResponseEntity<Order> confirmedOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderException {

        Order order=orderService.confirmedOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);

    }

    @PutMapping("/{orderId}/shipped")
    public ResponseEntity<Order> shippedOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderException {

        Order order=orderService.shippedOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);

    }

    @PutMapping("/{orderId}/delivered")
    public ResponseEntity<Order> deliveredOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderException {

        Order order=orderService.deliveredOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);

    }

    @PutMapping("/{orderId}/cancelled")
    public ResponseEntity<Order> cancelledOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderException {

        Order order=orderService.cancelledOrder(orderId);
        return new ResponseEntity<>(order,HttpStatus.OK);

    }

    @PutMapping("/{orderId}/delete")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws OrderException {

        orderService.deleteOrder(orderId);

        ApiResponse response=new ApiResponse();
        response.setMessage("Order Deleted Successfully");
        response.setStatus(true);

        return new ResponseEntity<>(response,HttpStatus.OK);

    }

}
