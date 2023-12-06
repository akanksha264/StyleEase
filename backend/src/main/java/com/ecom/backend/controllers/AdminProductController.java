package com.ecom.backend.controllers;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Product;
import com.ecom.backend.requests.ProductRequest;
import com.ecom.backend.responses.ApiResponse;
import com.ecom.backend.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {

        Product product=productService.createProduct(request);
        return new ResponseEntity<Product>(product, HttpStatus.CREATED);

    }

    @DeleteMapping("/{productId}/delete")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {

        String message=productService.deleteProduct(productId);

        ApiResponse response=new ApiResponse();
        response.setMessage(message);
        response.setStatus(true);

        return new ResponseEntity<>(response,HttpStatus.OK);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAllProducts() {

        List<Product> products=productService.findAllProducts();
        return new ResponseEntity<>(products,HttpStatus.OK);

    }

    @PutMapping("/{productId}/update")
    public ResponseEntity<Product> updateProduct(@RequestBody ProductRequest request, @PathVariable Long productId) throws ProductException {

        Product product=productService.updateProduct(productId,request);
        return new ResponseEntity<>(product, HttpStatus.CREATED);

    }

    @PostMapping("/creates")
    public ResponseEntity<ApiResponse> createMultipleProducts(@RequestBody List<ProductRequest> request) {

        for (ProductRequest product:request){
            productService.createProduct(product);
        }

        ApiResponse response=new ApiResponse();
        response.setMessage("Products Created Successfully");
        response.setStatus(true);

        return new ResponseEntity<>(response,HttpStatus.CREATED);

    }

}
