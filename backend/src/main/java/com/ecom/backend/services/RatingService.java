package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Rating;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.RatingRequest;

import java.util.List;

public interface RatingService {

    public Rating createRating(RatingRequest req, User user) throws ProductException;

    public List<Rating> getAllRatingsByProduct(Long productId);

}
