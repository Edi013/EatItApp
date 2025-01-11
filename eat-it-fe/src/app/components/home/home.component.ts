import { Component } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCarouselComponent } from "../recipe-carousel/recipe-carousel.component";
import { ItemsResponse } from '../../models/responses/items-response';

@Component({
  selector: 'app-home',
  imports: [RecipeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  recipes: RecipeDto[] = [];
  errorMessage: string | null = null;

  constructor(private recipeService: RecipeService) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.recipeService.getAllRecipes();
      if (response.hasFailed()) {
        this.errorMessage = 'Failed to fetch recipes';
      }

      this.recipes = response.items;
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Error fetching recipes: ' + error.message;
      } else {
        this.errorMessage = 'Error fetching recipes';
      }
    }
  }
}
