package com.ecom.backend.services;

import com.ecom.backend.models.OrderItem;
import com.ecom.backend.repositories.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImplementation implements OrderItemService{

    private final OrderItemRepository orderItemRepository;

    public OrderItemServiceImplementation(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {

        return orderItemRepository.save(orderItem);

    }
}
