package com.ecom.backend.services;

import com.ecom.backend.exceptions.CartItemException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.CartItem;
import com.ecom.backend.models.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;

    public CartItem exists(Cart cart, Product product, String size, Long userId);

    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException,UserException;

    public CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
