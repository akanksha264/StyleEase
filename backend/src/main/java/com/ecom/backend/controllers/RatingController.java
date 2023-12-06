package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.exceptions.UserException;
import com.ecom.backend.models.Rating;
import com.ecom.backend.models.User;
import com.ecom.backend.requests.RatingRequest;
import com.ecom.backend.services.RatingService;
import com.ecom.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final UserService userService;
    private final RatingService ratingService;

    public RatingController(UserService userService, RatingService ratingService) {
        this.userService = userService;
        this.ratingService = ratingService;
    }

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest request, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {

        User user=userService.findUserProfileByJwt(jwt);

        Rating rating=ratingService.createRating(request,user);

        return new ResponseEntity<>(rating, HttpStatus.CREATED);

    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductRatings (@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException,ProductException {

//        User user=userService.findUserProfileByJwt(jwt);

        List<Rating> ratings=ratingService.getAllRatingsByProduct(productId);

        return new ResponseEntity<>(ratings,HttpStatus.OK);

    }

}
