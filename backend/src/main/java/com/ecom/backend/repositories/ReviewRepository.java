package com.ecom.backend.repositories;

import com.ecom.backend.models.Rating;
import com.ecom.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    @Query("SELECT r FROM Review r WHERE r.product.id=:productId")
    public List<Review> getAllReviewsByProduct(@Param("productId") Long productId);

}
