import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service'; 
import { lastValueFrom, Observable } from 'rxjs';
import { ProductRecipeQuantityDto } from '../models/dtos/product-recipe-quantity-dto';
import { environment } from '../environments/environment';
import { ItemsResponse } from '../models/responses/items-response';
import { ExtendedProductDto } from '../models/dtos/extended-product-dto';
import { BaseResponse } from '../models/responses/base-response';
import { ItemResponse } from '../models/responses/item-response';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailsService {
  private baseRecipeDetailsUrl = environment.baseUrl + environment.recipeDetailsUrl;

  constructor(private http: HttpService) {}

  async getCostByRecipeId(recipeId: number): Promise<ItemResponse<ExtendedProductDto>> {
    const url = `${this.baseRecipeDetailsUrl}/cost/${recipeId}`;
    var response = await lastValueFrom(this.http.get<ItemResponse<ExtendedProductDto>>(url));
    const responseParsed = new ItemResponse<ExtendedProductDto>(
          response.statusCode,
          response.message,
          response.status,
          response.item
    );

    if(!responseParsed){
        console.log("getCostByRecipeId failed. Parsing error.")  
        return ItemResponse.failedResponse("Parsing error.");
    }

    return responseParsed;
  }
 
  async getProductsByRecipeId(recipeId: number): Promise<ItemsResponse<ExtendedProductDto | null>> {
    const url = `${this.baseRecipeDetailsUrl}/products/${recipeId}`;
    var response = await lastValueFrom(this.http.get<ItemsResponse<ExtendedProductDto>>(url));
    const responseParsed = new ItemsResponse<ExtendedProductDto>(
      response.statusCode,
      response.message,
      response.status,
      response.items
    );
    
    if(!responseParsed){
        console.log("getProductsByRecipeId failed. Parsing error.")  
        return ItemsResponse.failedResponse("Parsing error.");
    }
    
    return responseParsed;
  }

  async putProductOnRecipe(dto: ProductRecipeQuantityDto): Promise<BaseResponse> {
    const url = `${this.baseRecipeDetailsUrl}`;
    var response = await lastValueFrom(this.http.post<BaseResponse>(url, dto));

    if(!response){
        console.log("putProductOnRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }
}
