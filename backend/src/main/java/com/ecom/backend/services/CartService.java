package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCardItem(Long userId, AddItemRequest req) throws ProductException;

    public Cart findUserCart(Long userId);

    public String deleteCart(Cart cart);

}
