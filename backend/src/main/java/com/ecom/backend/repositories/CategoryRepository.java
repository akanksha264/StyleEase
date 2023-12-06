package com.ecom.backend.repositories;

import com.ecom.backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    public Category findByName(String name);

    @Query("SELECT c FROM Category c WHERE c.name=:name AND c.parentCategory=:parent")
    public Category findByNameAndParentCategoryName(@Param("name") String name, @Param("parent") Category parent);

}
