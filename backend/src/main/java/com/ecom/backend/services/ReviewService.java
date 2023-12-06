package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Review;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.ReviewRequest;

import java.util.List;

public interface ReviewService {

    public Review createReview(ReviewRequest req, User user) throws ProductException;

    public List<Review> getAllReviewsByProduct(Long productId);

}
