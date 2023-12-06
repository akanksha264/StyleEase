package com.ecom.backend.services;

import com.ecom.backend.exceptions.CartItemException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.CartItem;
import com.ecom.backend.models.Product;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.CartItemRepository;
import com.ecom.backend.repositories.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{

    private final CartItemRepository cartItemRepository;
    private final UserService userService;
//    private final CartRepository cartRepository;

    public CartItemServiceImplementation(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
//        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {

        cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(cartItem);

    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {

        CartItem item=findCartItemById(id);
        User user=userService.findUserById(item.getUserId());

        if (user.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            item.setDiscountedPrice(item.getQuantity() * item.getProduct().getDiscountedPrice());
        }

        return cartItemRepository.save(item);

    }

    @Override
    public CartItem exists(Cart cart, Product product, String size, Long userId) {

        return cartItemRepository.exists(cart,product,size,userId);
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {

        CartItem cartItem=findCartItemById(cartItemId);

        User user=userService.findUserById(cartItem.getUserId());

        User reqUser=userService.findUserById(userId);

        if (user.getId().equals(reqUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        }

        else {
            throw new UserException("Cannot remove another user's item.");
        }

    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> cartItem=cartItemRepository.findById(cartItemId);

        if (cartItem.isPresent()) {
            return cartItem.get();
        }

        throw new CartItemException("Cart Item not found with id "+cartItemId);
    }
}
