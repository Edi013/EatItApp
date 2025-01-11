import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ProductDto } from '../models/dtos/product-dto';
import { BaseResponse } from '../models/responses/base-response';
import { ItemResponse } from '../models/responses/item-response';
import { ItemsResponse } from '../models/responses/items-response';
import { HttpService } from './utils/http.service';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = environment.productUrl;

  constructor(private http: HttpService) {}

  async getAllProducts(): Promise<ItemsResponse<ProductDto>> {
      const response = await lastValueFrom(this.http.get<ItemsResponse<ProductDto>>(this.productUrl));
      const responseParsed = new ItemsResponse<ProductDto>(
        response.statusCode,
        response.message,
        response.status,
        response.items ?? []
      );
  
      if (!responseParsed) {
        console.error('getAllRecipes failed. Parsing error.');
        return ItemsResponse.failedResponse<ProductDto>('Parsing error.');
      }
  
      return responseParsed;
    }

    async getRecipeById(id: string): Promise<ItemResponse<ProductDto>> {
        const response = await lastValueFrom(this.http.get<ItemResponse<ProductDto>>(`${this.productUrl}/${id}`));
        const responseParsed = new ItemResponse<ProductDto>(
          response.statusCode,
          response.message,
          response.status,
          response.item
        );
    
        if (!responseParsed) {
          console.error('getRecipeById failed. Parsing error.');
          return ItemResponse.failedResponse<ProductDto>('Parsing error.');
        }
    
        return responseParsed;
      }

  async createRecipe(productDto: ProductDto): Promise<ItemResponse<ProductDto>> {
      const response = await lastValueFrom(this.http.post<ItemResponse<ProductDto>>(`${this.productUrl}`, productDto));
      const responseParsed = new ItemResponse<ProductDto>(
        response.statusCode,
        response.message,
        response.status,
        response.item
      );
  
      if (!responseParsed) {
        console.error('createRecipe failed. Parsing error.');
        return ItemResponse.failedResponse<ProductDto>('Parsing error.');
      }
  
      return responseParsed;
    }

  async updateProduct(productId: number, productDto: ProductDto): Promise<ItemResponse<ProductDto>> {
    const response = await lastValueFrom(this.http.put<ItemResponse<ProductDto>>(`${this.productUrl}/${productId}`, productDto));
    const responseParsed = new ItemResponse<ProductDto>(
      response.statusCode,
      response.message,
      response.status,
      response.item
    );

    if (!responseParsed) {
      console.error('updateProduct failed. Parsing error.');
      return ItemResponse.failedResponse<ProductDto>('Parsing error.');
    }

    return responseParsed;
  }

  async deleteProduct(productId: number): Promise<BaseResponse> {
    const response = await lastValueFrom
    (this.http.delete<BaseResponse>(`${this.productUrl}/${productId}`));

    if (!response) {
      console.error('deleteProduct failed. Parsing error.');
      return BaseResponse.failedResponse('Parsing error.');
    }

    return response;
  }
}
