import { environment } from "../environments/environment";
import { ProductDto } from "../models/dtos/product-dto";
import { BaseResponse } from "../models/responses/base-response";
import { ItemResponse } from "../models/responses/item-response";
import { ItemsResponse } from "../models/responses/items-response";
import { HttpService } from "./utils/http.service";

class ProductService {
    ;
    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }

    async getAllProducts(): Promise<ProductDto[]> {
        try {
            const response = await this.httpService.get<ItemsResponse<ProductDto>>(environment.productUrl);
            return response.items;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }
    }

    async getProductById(productId: number): Promise<ProductDto> {
        try {
            const response = await this.httpService.get<ItemResponse<ProductDto>>(`${environment.productUrl}/${productId}`);
            return response.item;
        } catch (error) {
            console.error(`Error fetching product with ID ${productId}:`, error);
            throw new Error(`Failed to fetch product with ID ${productId}`);
        }
    }

    async createProduct(productDto: ProductDto): Promise<ProductDto> {
        try {
            const response = await this.httpService.post<ItemResponse<ProductDto>>(environment.productUrl, productDto);
            return response.item;
        } catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Failed to create product');
        }
    }

    async updateProduct(productId: number, productDto: ProductDto): Promise<ProductDto> {
        try {
            const response = await this.httpService.put<ItemResponse<ProductDto>>(`${environment.productUrl}/${productId}`, productDto);
            return response.item;
        } catch (error) {
            console.error(`Error updating product with ID ${productId}:`, error);
            throw new Error(`Failed to update product with ID ${productId}`);
        }
    }

    async deleteProduct(productId: number): Promise<void> {
        try {
            await this.httpService.delete<BaseResponse>(`${environment.productUrl}/${productId}`);
            console.log(`Product with ID ${productId} deleted successfully.`);
        } catch (error) {
            console.error(`Error deleting product with ID ${productId}:`, error);
            throw new Error(`Failed to delete product with ID ${productId}`);
        }
    }
}