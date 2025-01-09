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
  private baseUrl = environment.productUrl;

  constructor(private httpService: HttpService) {}

  async getAllProducts(): Promise<ItemsResponse<ProductDto | null>> {
    const response = await lastValueFrom(
      await this.httpService.get<Observable<ItemsResponse<ProductDto>>>(this.baseUrl)
    );
    if (!(response instanceof ItemsResponse)) {
        console.error('getAllProducts failed. Parsing error.');
        return ItemsResponse.failedResponse('Parsing error.');
    }
    
    var result: ItemsResponse<ProductDto> = 
            new ItemsResponse<ProductDto>
                (response.statusCode, response.message, response.status, response.items);
    return result;
  }

  async getProductById(productId: number): Promise<ItemResponse<ProductDto | null>> {
    const response = await lastValueFrom(
      await this.httpService.get<Observable<ItemResponse<ProductDto>>>(`${this.baseUrl}/${productId}`)
    );

    if (!(response instanceof ItemResponse)) {
      console.error(`getProductById failed. Parsing error.`);
      return ItemResponse.failedResponse('Parsing error.');
    }

    var result: ItemResponse<ProductDto> = 
        new ItemResponse<ProductDto>
            (response.statusCode, response.message, response.status, response.item);
    return result;  
    }

  async createProduct(productDto: ProductDto): Promise<BaseResponse> {
    const response = await lastValueFrom(
      await this.httpService.post<Observable<BaseResponse>>(this.baseUrl, productDto)
    );

    if (!(response instanceof BaseResponse)) {
      console.error('createProduct failed. Parsing error.');
      return BaseResponse.failedResponse('Parsing error.');
    }

    return response;
  }

  async updateProduct(productId: number, productDto: ProductDto): Promise<BaseResponse> {
    const response = await lastValueFrom(
      await this.httpService.put<Observable<BaseResponse>>(`${this.baseUrl}/${productId}`, productDto)
    );

    if (!(response instanceof BaseResponse)) {
      console.error('updateProduct failed. Parsing error.');
      return BaseResponse.failedResponse('Parsing error.');
    }

    return response;
  }

  async deleteProduct(productId: number): Promise<BaseResponse> {
    const response = await lastValueFrom(
      await this.httpService.delete<Observable<BaseResponse>>(`${this.baseUrl}/${productId}`)
    );

    if (!(response instanceof BaseResponse)) {
      console.error('deleteProduct failed. Parsing error.');
      return BaseResponse.failedResponse('Parsing error.');
    }

    return response;
  }
}
