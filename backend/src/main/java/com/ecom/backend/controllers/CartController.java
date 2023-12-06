package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.AddItemRequest;
import com.ecom.backend.responses.ApiResponse;
import com.ecom.backend.services.CartService;
import com.ecom.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {

        User user=userService.findUserProfileByJwt(jwt);
        Cart cart=cartService.findUserCart(user.getId());

        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest request, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {

        User user=userService.findUserProfileByJwt(jwt);

        cartService.addCardItem(user.getId(),request);

        ApiResponse response=new ApiResponse();
        response.setStatus(true);
        response.setMessage("Item added to Cart");

        return new ResponseEntity<>(response,HttpStatus.OK);

    }

}
