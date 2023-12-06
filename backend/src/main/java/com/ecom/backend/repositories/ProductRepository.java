package com.ecom.backend.repositories;

import com.ecom.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p FROM Product p "+
            "WHERE (:thirdCategory='' OR p.category.name=:thirdCategory) "+
            "AND (:secondCategory='' OR p.category.parentCategory.name=:secondCategory)"+
            "AND (:topCategory='' OR p.category.parentCategory.parentCategory.name=:topCategory)"+
            "AND ((:maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) "+
            "AND (:minDiscount IS NULL OR p.discountPercent>=:minDiscount) "+
            "ORDER BY " +
            "CASE WHEN :sort='price_low' THEN p.discountedPrice END ASC, "+
            "CASE WHEN :sort='price_high' THEN p.discountedPrice END DESC"
    )
    public List<Product> filterProducts(@Param("topCategory") String topCategory,
                                        @Param("secondCategory") String secondCategory,
                                        @Param("thirdCategory") String thirdCategory,
                                        @Param("minPrice") Integer minPrice,
                                        @Param("maxPrice") Integer maxPrice,
                                        @Param("minDiscount") Integer minDiscount,
                                        @Param("sort") String sort);

}
