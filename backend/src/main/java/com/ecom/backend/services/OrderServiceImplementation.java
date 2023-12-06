package com.ecom.backend.services;

import com.ecom.backend.config.OrderStatus;
import com.ecom.backend.config.PaymentStatus;
import com.ecom.backend.exceptions.OrderException;
import com.ecom.backend.models.*;
import com.ecom.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService{

    private final CartService cartService;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderServiceImplementation(CartService cartService, OrderRepository orderRepository, AddressRepository addressRepository, UserRepository userRepository,  OrderItemRepository orderItemRepository) {
        this.cartService = cartService;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemRepository = orderItemRepository;
    }


    @Override
    public Order createOrder(User user, Address shippingAddress) {

        shippingAddress.setUser(user);
        Address address=addressRepository.save(shippingAddress);
        user.getAddresses().add(address);
        userRepository.save(user);

        Cart cart=cartService.findUserCart(user.getId());
        List<OrderItem> orderItems=new ArrayList<>();

        for (CartItem cartItem:cart.getCartItems()) {
            OrderItem orderItem=new OrderItem();

            orderItem.setPrice(cartItem.getPrice());
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSize(cartItem.getSize());
            orderItem.setColor(cartItem.getColor());
            orderItem.setUserId(cartItem.getUserId());
            orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());

            OrderItem createdOrderItem=orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);
        }

        Order createdOrder=new Order();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
        createdOrder.setDiscount(cart.getDiscount());
        createdOrder.setTotalItems(cart.getTotalItems());
        createdOrder.setShippingAddress(address);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setOrderStatus(OrderStatus.PENDING);
        createdOrder.getPaymentDetails().setPaymentStatus(PaymentStatus.PENDING);
        createdOrder.setCreatedAt(LocalDateTime.now());

        Order savedOrder=orderRepository.save(createdOrder);

        for (OrderItem orderItem:orderItems) {
            orderItem.setOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }

        return savedOrder;

    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        Optional<Order> order=orderRepository.findById(orderId);

        if (order.isPresent()) {
            return order.get();
        }
        throw new OrderException("Order does not exist with id "+orderId);
    }

    @Override
    public List<Order> userOrderHistory(Long userId) {

        return orderRepository.getUserOrders(userId);

    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {

        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.PLACED);
        order.getPaymentDetails().setPaymentStatus(PaymentStatus.COMPLETED);

        return orderRepository.save(order);

    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {

        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);

    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {

        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.SHIPPED);
        return orderRepository.save(order);

    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {

        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.DELIVERED);
        return orderRepository.save(order);

    }

    @Override
    public Order cancelledOrder(Long orderId) throws OrderException {

        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);

    }

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();

    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {

//        Order order=findOrderById(orderId);
        orderRepository.deleteById(orderId);

    }
}
