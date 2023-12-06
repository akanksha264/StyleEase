package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.CartItemException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.CartItem;
import com.ecom.backend.models.User;
import com.ecom.backend.responses.ApiResponse;
import com.ecom.backend.services.CartItemService;
import com.ecom.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;
    private final UserService userService;

    public CartItemController(CartItemService cartItemService, UserService userService) {
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse> removeCartItem(@PathVariable Long itemId, @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {

        User user=userService.findUserProfileByJwt(jwt);

        cartItemService.removeCartItem(user.getId(),itemId);

        ApiResponse response=new ApiResponse();
        response.setStatus(true);
        response.setMessage("Item deleted from cart");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PutMapping("/{itemId}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long itemId, @RequestBody CartItem cartItem, @RequestHeader("Authorization") String jwt) throws UserException,CartItemException {

        User user=userService.findUserProfileByJwt(jwt);

        CartItem updatedCartItem=cartItemService.updateCartItem(user.getId(),itemId,cartItem);

        return new ResponseEntity<>(updatedCartItem,HttpStatus.OK);

    }


}
