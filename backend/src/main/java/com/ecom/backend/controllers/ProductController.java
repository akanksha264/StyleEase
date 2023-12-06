package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Product;
import com.ecom.backend.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public ResponseEntity<Page<Product>> findProductByCategory(
            @RequestParam(required = false, defaultValue = "") String topCategory,
            @RequestParam(required = false, defaultValue = "") String secondCategory,
            @RequestParam(required = false, defaultValue = "") String thirdCategory,
            @RequestParam(required = false) List<String> color,
            @RequestParam(required = false) List<String> size,
            @RequestParam(required = false, defaultValue = "0") Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String stock,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {

        Page<Product> res=productService.getAllProducts(topCategory,secondCategory,thirdCategory,color,size,minPrice,maxPrice,minDiscount,sort,stock,pageNum,pageSize);

        return new ResponseEntity<>(res, HttpStatus.OK);

    }

    @GetMapping("/id/{productId}")
    public  ResponseEntity<Product> findProductById(@PathVariable Long productId) throws ProductException {

        Product product=productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.OK);

    }
//
//    @GetMapping("/search")
//    public ResponseEntity<List>

}
