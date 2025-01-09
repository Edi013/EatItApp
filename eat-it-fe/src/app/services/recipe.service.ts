import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service';
import { ItemsResponse } from '../models/responses/items-response';
import { RecipeDto } from '../models/dtos/recipe-dto';
import { ItemResponse } from '../models/responses/item-response';
import { BaseResponse } from '../models/responses/base-response';
import { last, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = '/recipe';

  constructor(private httpService: HttpService) {}

  async getAllRecipes(): Promise<ItemsResponse<RecipeDto | null>> {
    var response = await lastValueFrom(await this.httpService.get<Observable<ItemsResponse<RecipeDto>>>(`${this.baseUrl}`));

    if(!(response instanceof ItemsResponse)){
        console.log("putProductOnRecipe failed. Parsing error.")  
        return ItemsResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async getRecipesByOwner(userId: string): Promise<ItemsResponse<RecipeDto | null>> {
    var response = await lastValueFrom(await this.httpService.get<Observable<ItemsResponse<RecipeDto>>>(`${this.baseUrl}/owner/${userId}`));

    if(!(response instanceof ItemsResponse)){
        console.log("putProductOnRecipe failed. Parsing error.")  
        return ItemsResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async getRecipeById(id: string): Promise<ItemResponse<RecipeDto | null>> {
    var response = await lastValueFrom(await this.httpService.get<Observable<ItemResponse<RecipeDto>>>(`${this.baseUrl}/${id}`));

    if(!(response instanceof ItemResponse)){
        console.log("putProductOnRecipe failed. Parsing error.")  
        return ItemResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async insertRecipe(recipeDto: RecipeDto): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.httpService.post<Observable<BaseResponse>>(`${this.baseUrl}`, recipeDto));

    if(!(response instanceof BaseResponse)){
        console.log("insertRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async updateRecipe(id: number, recipeDto: RecipeDto): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.httpService.put<Observable<BaseResponse>>(`${this.baseUrl}/${id}`, recipeDto));

    if(!(response instanceof BaseResponse)){
        console.log("updateRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async deleteRecipe(id: number): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.httpService.delete<Observable<BaseResponse>>(`${this.baseUrl}/${id}`));

    if(!(response instanceof BaseResponse)){
        console.log("deleteRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }
}
