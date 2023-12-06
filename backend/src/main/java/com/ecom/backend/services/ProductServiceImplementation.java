package com.ecom.backend.services;

import com.ecom.backend.exceptions.ProductException;
import com.ecom.backend.models.Category;
import com.ecom.backend.models.Color;
import com.ecom.backend.models.Product;
import com.ecom.backend.models.Size;
import com.ecom.backend.repositories.CategoryRepository;
import com.ecom.backend.repositories.ProductRepository;
import com.ecom.backend.requests.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImplementation implements ProductService{

    private final ProductRepository productRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;

    public ProductServiceImplementation(ProductRepository productRepository, UserService userService, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(ProductRequest req) {

        Category topLevel=categoryRepository.findByName(req.getTopLevelCategory());
        if(topLevel==null) {
            System.out.println("Works");
            Category topLevelCategory=new Category();
            topLevelCategory.setName(req.getTopLevelCategory());
            topLevelCategory.setLevel(1);

            topLevel=categoryRepository.save(topLevelCategory);
        }

        Category secondLevel=categoryRepository.findByNameAndParentCategoryName(req.getSecondLevelCategory(),topLevel);
        if(secondLevel==null) {
            Category secondLevelCategory=new Category();
            secondLevelCategory.setName(req.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);

            secondLevel=categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel=categoryRepository.findByNameAndParentCategoryName(req.getThirdLevelCategory(),secondLevel);
        if(thirdLevel==null) {
            Category thirdLevelCategory=new Category();
            thirdLevelCategory.setName(req.getThirdLevelCategory());
            thirdLevelCategory.setParentCategory(secondLevel);
            thirdLevelCategory.setLevel(3);

            thirdLevel=categoryRepository.save(thirdLevelCategory);
        }

        Product product=new Product();
        product.setTitle(req.getTitle());

//        product.setColors(req.getColors());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setDiscountedPrice(req.getDiscountedPrice());
        int discountPercent=(req.getPrice()- req.getDiscountedPrice())*100/ req.getPrice();
        product.setDiscountPercent(discountPercent);
        product.setImageUrl(req.getImageUrl());
        product.setBrand(req.getBrand());

        int quantity=0;
        for (Color color:req.getColors()) {

            Color newColor=new Color();
            newColor.setName(color.getName());
            newColor.setSizes(color.getSizes());
            product.getColors().add(newColor);

            for (Size size:color.getSizes()) {
                quantity = quantity+size.getQuantity();
            }

        }

        product.setQuantity(quantity);

        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        for (Color color:product.getColors()) {
            color.setProduct(product);
        }

        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {

        Product product=findProductById(productId);

        for (Color color:product.getColors()) {
            color.getSizes().clear();
        }

        product.getColors().clear();

        productRepository.delete(product);

        return "Product Deleted Successfully";
    }

    @Override
    public Product updateProduct(Long productId, ProductRequest req) throws ProductException {

        Product product=findProductById(productId);

        if (req.getTitle() != null) {
            product.setTitle(req.getTitle());
        }

        if(req.getDescription() != null) {
            product.setDescription(req.getDescription());
        }

        if (!req.getColors().isEmpty()) {
            product.setColors(new HashSet<>(req.getColors()));
        }

        if (req.getImageUrl() != null) {
            product.setImageUrl(req.getImageUrl());
        }

        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long productId) throws ProductException {

        Optional<Product> product=productRepository.findById(productId);

        if(product.isPresent()) {
            return product.get();
        }

        throw new ProductException("Product not found with id "+productId);
    }

    @Override
    public List<Product> findProductsByCategory(String category) {
        return null;
    }

    @Override
    public List<Product> findAllProducts() {

        return productRepository.findAll();

    }

    @Override
    public Page<Product> getAllProducts(String topCategory, String secondCategory, String thirdCategory, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {

        Pageable pageable= PageRequest.of(pageNumber-1, pageSize);

        List<Product> products=productRepository.filterProducts(topCategory,secondCategory,thirdCategory,minPrice,maxPrice,minDiscount,sort);

        if (colors != null && !colors.isEmpty()) {
            products = products.stream()
                    .filter(p -> colors.stream()
                            .anyMatch(fc -> p.getColors().stream()
                                    .anyMatch(c -> c.getName().equalsIgnoreCase(fc) &&
                                            (sizes == null || sizes.isEmpty() || c.getSizes().stream()
                                                    .anyMatch(s -> sizes.stream()
                                                            .anyMatch(fs -> fs.equalsIgnoreCase(s.getName()))
                                                    )
                                            )
                                    )
                            )
                    )
                    .collect(Collectors.toList());
        }

        else if(sizes!=null && !sizes.isEmpty()) {
            products=products.stream()
                    .filter(p -> p.getColors().stream()
                            .anyMatch(c -> c.getSizes().stream()
                                    .anyMatch(s -> sizes.stream()
                                            .anyMatch(fs -> fs.equalsIgnoreCase(s.getName())))
                            )
                    ).collect(Collectors.toList());
        }

        if(stock!=null && stock!="") {
            if(stock.equals("in_stock")) {
                products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
            }
            else {
                products=products.stream().filter(p->p.getQuantity()==0).collect(Collectors.toList());
            }
        }

        int startIndex=(int) pageable.getOffset();
        int endIndex=(int) Math.min(startIndex+pageable.getPageSize(),products.size());

        List<Product> pageContent=new ArrayList<>();

        if(startIndex<=endIndex) {
            pageContent=products.subList(startIndex,endIndex);
        }


        return new PageImpl<>(pageContent,pageable,products.size());

    }
}
