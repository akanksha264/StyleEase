package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Cart;
import com.ecom.backend.models.CartItem;
import com.ecom.backend.models.Product;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.CartRepository;
import com.ecom.backend.requests.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImplementation implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;
    private final ProductService productService;

    public CartServiceImplementation(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {

        Cart cart=new Cart();

        cart.setUser(user);

        return cartRepository.save(cart);

    }

    @Override
    public String addCardItem(Long userId, AddItemRequest req) throws ProductException {

        Cart cart=cartRepository.findByUserId(userId);

        Product product=productService.findProductById(req.getProductId());

        CartItem isPresent=cartItemService.exists(cart,product,req.getSize(),userId);

        if (isPresent==null) {
            CartItem cartItem=new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            if(req.getQuantity()==0) {
                req.setQuantity(1);
            }

            System.out.println(req.getQuantity());
            cartItem.setQuantity(req.getQuantity());
            cartItem.setUserId(userId);

            Integer price=req.getQuantity() * product.getPrice();
            cartItem.setPrice(price);

            Integer discountedPrice= req.getQuantity() * product.getDiscountedPrice();
            cartItem.setDiscountedPrice(discountedPrice);

            cartItem.setSize(req.getSize());
            cartItem.setColor(req.getColor());

            CartItem createdCartItem=cartItemService.createCartItem(cartItem);

            cart.getCartItems().add(createdCartItem);
            cartRepository.save(cart);

        }

        else {
            System.out.println("Item already exists");
        }

        return "Item added to Cart.";

    }

    @Override
    public Cart findUserCart(Long userId) {

        Cart cart=cartRepository.findByUserId(userId);

        Integer totalPrice=0;
        Integer totalDiscountedPrice=0;
        int totalItems=0;

        for(CartItem cartItem:cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
            totalItems = totalItems + cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItems(totalItems);
        cart.setDiscount(totalPrice-totalDiscountedPrice);

        return cartRepository.save(cart);
    }

    @Override
    public String deleteCart(Cart cart) {

        cart.getCartItems().clear();
        cartRepository.delete(cart);
        return "Cart deleted Successfully";

    }


}
