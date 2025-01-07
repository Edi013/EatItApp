package ide.eatit.controller;

import ide.eatit.model.Product;
import ide.eatit.model.dto.ProductDto;
import ide.eatit.model.responses.BaseResponse;
import ide.eatit.model.responses.GetAllResponse;
import ide.eatit.model.responses.GetResponse;
import ide.eatit.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public GetAllResponse<ProductDto> getAll() {
        List<ProductDto> productsDto = productService.getAllProducts()
                .stream()
                .map(Product::toDto)
                .toList();

        return new GetAllResponse<ProductDto>(
                "200",
                "Products retrieved successfully.",
                "SUCCESS",
                productsDto
        );
    }

    @GetMapping("/{id}")
    public BaseResponse getById(@PathVariable String id) {
        try {
            Integer idNumber = Integer.parseInt(id);

            Optional<Product> result = productService.getProductById(idNumber);
            if (result.isEmpty()) {
                return new BaseResponse("404", "Product not found.", "FAILED");
            }

            return new GetResponse<ProductDto>("200", "Product found.", "SUCCESS", result.get().toDto());

        } catch (NumberFormatException e) {
            return new BaseResponse("400", "Invalid product ID.", "FAILED");
        }
    }

    @PostMapping
    public BaseResponse insertProduct(@RequestBody ProductDto productDto) {
        Product insertedProduct = productService.createProduct(productDto);
        if (insertedProduct == null) {
            return new BaseResponse("500", "Failed to insert product.", "FAILED");
        }
        return new GetResponse<ProductDto>("200", "Product inserted.", "SUCCESS", insertedProduct.toDto());
    }

    @PutMapping("/{id}")
    public BaseResponse updateProduct(@PathVariable Integer id, @RequestBody ProductDto productDto) {
        Product result = productService.updateProduct(id, productDto);
        if (result == null) {
            return new BaseResponse("400", String.format("Product not found with id: %d", id), "FAILED");
        }

        return new GetResponse<ProductDto>("200", "Product updated.", "SUCCESS", result.toDto());
    }

    @DeleteMapping("/{id}")
    public BaseResponse deleteProduct(@PathVariable Integer id) {
        if (!productService.deleteProduct(id)) {
            return new BaseResponse("400", String.format("Product not found, id: %d", id), "FAILED");
        }
        return new BaseResponse("200", "Product deleted.", "SUCCESS");
    }
}

