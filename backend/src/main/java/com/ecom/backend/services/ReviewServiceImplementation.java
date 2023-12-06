package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Product;
import com.ecom.backend.models.Review;
import com.ecom.backend.models.User;
import com.ecom.backend.repositories.ReviewRepository;
import com.ecom.backend.requests.ReviewRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final ProductService productService;

    public ReviewServiceImplementation(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }

    @Override
    public Review createReview(ReviewRequest req, User user) throws ProductException {

        Product product=productService.findProductById(req.getProductId());

        Review review=new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReview(req.getReview());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);

    }

    @Override
    public List<Review> getAllReviewsByProduct(Long productId) {

        return reviewRepository.getAllReviewsByProduct(productId);

    }
}
