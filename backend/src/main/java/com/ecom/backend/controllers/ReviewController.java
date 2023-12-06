package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Rating;
import com.ecom.backend.models.Review;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.RatingRequest;
import com.ecom.backend.requests.ReviewRequest;
import com.ecom.backend.services.ReviewService;
import com.ecom.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;


    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest request, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {

        User user=userService.findUserProfileByJwt(jwt);

        Review review=reviewService.createReview(request,user);

        return new ResponseEntity<>(review, HttpStatus.CREATED);

    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews (@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException,ProductException {

//        User user=userService.findUserProfileByJwt(jwt);

        List<Review> reviews=reviewService.getAllReviewsByProduct(productId);

        return new ResponseEntity<>(reviews,HttpStatus.OK);

    }

}
