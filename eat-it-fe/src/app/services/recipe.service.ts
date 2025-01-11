import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service';
import { ItemsResponse } from '../models/responses/items-response';
import { RecipeDto } from '../models/dtos/recipe-dto';
import { ItemResponse } from '../models/responses/item-response';
import { BaseResponse } from '../models/responses/base-response';
import { last, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeUrl = '/recipe';

  constructor(private http: HttpService) {}

  async getAllRecipes(): Promise<BaseResponse> {
    var response = await lastValueFrom(this.http.get<any>(this.recipeUrl));

    //if(!(response instanceof ItemsResponse) && !(response instanceof BaseResponse)){
     if(response.hasFailed()){ 
        console.log("getAllRecipes failed. Parsing error.")  
      return ItemsResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  // async getRecipesByOwner(userId: string): Promise<BaseResponse> {
  //   var response = await lastValueFrom(await this.http.get<Observable<ItemsResponse<RecipeDto>>>(`${this.recipeUrl}/owner/${userId}`));

  //   if(!(response instanceof ItemsResponse)){
  //       console.log("getRecipesByOwner failed. Parsing error.")  
  //       return ItemsResponse.failedResponse("Parsing error.");
  //   }

  //   return response;
  // }

  // async getRecipeById(id: string): Promise<BaseResponse> {
  //   var response = await lastValueFrom(await this.http.get<Observable<ItemResponse<RecipeDto>>>(`${this.recipeUrl}/${id}`));

  //   if(!(response instanceof ItemResponse)){
  //       console.log("getRecipeById failed. Parsing error.")  
  //       return ItemResponse.failedResponse("Parsing error.");
  //   }

  //   return response;
  // }

  async insertRecipe(recipeDto: RecipeDto): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.http.post<Observable<BaseResponse>>(`${this.recipeUrl}`, recipeDto));

    if(!(response instanceof BaseResponse)){
        console.log("insertRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async updateRecipe(id: number, recipeDto: RecipeDto): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.http.put<Observable<BaseResponse>>(`${this.recipeUrl}/${id}`, recipeDto));

    if(!(response instanceof BaseResponse)){
        console.log("updateRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }

  async deleteRecipe(id: number): Promise<BaseResponse> {
    var response = await lastValueFrom(await this.http.delete<Observable<BaseResponse>>(`${this.recipeUrl}/${id}`));

    if(!(response instanceof BaseResponse)){
        console.log("deleteRecipe failed. Parsing error.")  
        return BaseResponse.failedResponse("Parsing error.");
    }

    return response;
  }
}
