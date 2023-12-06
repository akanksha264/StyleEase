package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Product;
import com.ecom.backend.models.Rating;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.RatingRepository;
import com.ecom.backend.requests.RatingRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImplementation implements RatingService{

    private final RatingRepository ratingRepository;
    private final ProductService productService;

    public RatingServiceImplementation(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {

        Product product=productService.findProductById(req.getProductId());

        Rating rating=new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());

        return ratingRepository.save(rating);

    }

    @Override
    public List<Rating> getAllRatingsByProduct(Long productId) {

        return ratingRepository.getAllRatingsByProduct(productId);

    }
}
