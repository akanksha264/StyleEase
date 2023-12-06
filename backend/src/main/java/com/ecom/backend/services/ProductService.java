package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Product;
import com.ecom.backend.requests.ProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    public Product createProduct (ProductRequest req);

    public String deleteProduct (Long productId) throws ProductException;

    public Product updateProduct (Long productId, ProductRequest req) throws ProductException;

    public Product findProductById (Long productId) throws ProductException;

    public List<Product> findProductsByCategory(String category);

    public List<Product> findAllProducts();

    public Page<Product> getAllProducts(String topCategory, String secondCategory, String thirdCategory, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);

}
