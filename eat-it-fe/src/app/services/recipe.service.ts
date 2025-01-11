import { Injectable } from '@angular/core';
import { HttpService } from './utils/http.service';
import { ItemsResponse } from '../models/responses/items-response';
import { RecipeDto } from '../models/dtos/recipe-dto';
import { ItemResponse } from '../models/responses/item-response';
import { BaseResponse } from '../models/responses/base-response';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeUrl = '/recipe';

  constructor(private http: HttpService) {}

  async getAllRecipes(): Promise<ItemsResponse<RecipeDto>> {
    const response = await lastValueFrom(this.http.get<ItemsResponse<RecipeDto>>(this.recipeUrl));
    const responseParsed = new ItemsResponse<RecipeDto>(
      response.statusCode,
      response.message,
      response.status,
      response.items ?? []
    );

    if (!responseParsed) {
      console.error('getAllRecipes failed. Parsing error.');
      return ItemsResponse.failedResponse<RecipeDto>('Parsing error.');
    }

    return responseParsed;
  }

  async getRecipesByOwner(userId: string): Promise<ItemsResponse<RecipeDto>> {
    const response = await lastValueFrom(this.http.get<ItemsResponse<RecipeDto>>(`${this.recipeUrl}/owner/${userId}`));
    const responseParsed = new ItemsResponse<RecipeDto>(
      response.statusCode,
      response.message,
      response.status,
      response.items ?? []
    );

    if (!responseParsed) {
      console.error('getRecipesByOwner failed. Parsing error.');
      return ItemsResponse.failedResponse<RecipeDto>('Parsing error.');
    }

    return responseParsed;
  }

  async getRecipeById(id: string): Promise<ItemResponse<RecipeDto>> {
    const response = await lastValueFrom(this.http.get<ItemResponse<RecipeDto>>(`${this.recipeUrl}/${id}`));
    const responseParsed = new ItemResponse<RecipeDto>(
      response.statusCode,
      response.message,
      response.status,
      response.item
    );

    if (!responseParsed) {
      console.error('getRecipeById failed. Parsing error.');
      return ItemResponse.failedResponse<RecipeDto>('Parsing error.');
    }

    return responseParsed;
  }

  async createRecipe(recipeDto: RecipeDto): Promise<ItemResponse<RecipeDto>> {
    const response = await lastValueFrom(this.http.post<ItemResponse<RecipeDto>>(`${this.recipeUrl}`, recipeDto));
    const responseParsed = new ItemResponse<RecipeDto>(
      response.statusCode,
      response.message,
      response.status,
      response.item
    );

    if (!responseParsed) {
      console.error('createRecipe failed. Parsing error.');
      return ItemResponse.failedResponse<RecipeDto>('Parsing error.');
    }

    return responseParsed;
  }

  async updateRecipe(id: number, recipeDto: RecipeDto): Promise<ItemResponse<RecipeDto>> {
    const response = await lastValueFrom(this.http.put<ItemResponse<RecipeDto>>(`${this.recipeUrl}/${id}`, recipeDto));
    const responseParsed = new ItemResponse<RecipeDto>(
      response.statusCode,
      response.message,
      response.status,
      response.item
    );
    if (!responseParsed) {
      console.error('updateRecipe failed. Parsing error.');
      return ItemResponse.failedResponse<RecipeDto>('Parsing error.');
    }

    return responseParsed;
  }

  async deleteRecipe(id: number): Promise<BaseResponse> {
    const response = await lastValueFrom(this.http.delete<BaseResponse>(`${this.recipeUrl}/${id}`));
    const responseParsed = new BaseResponse(response.statusCode, response.message, response.status);

    if (!responseParsed) {
      console.error('deleteRecipe failed. Parsing error.');
      return BaseResponse.failedResponse('Parsing error.');
    }

    return responseParsed;
  }
}
