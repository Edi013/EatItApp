import { Component } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCarouselComponent } from "../recipe-carousel/recipe-carousel.component";
import { ProductService } from '../../services/product.serice';
import { ProductDto } from '../../models/dtos/product-dto';
import {MatDividerModule} from '@angular/material/divider';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { Router } from '@angular/router';
import { CookiesService } from '../../services/utils/cookies.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  imports: [
    RecipeCarouselComponent,
    MatDividerModule,
    TopBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  recipes: RecipeDto[] = [];
  errorMessage: string | null = null;

  constructor(private recipeService: RecipeService, private router: Router, private cookiesService: CookiesService) {}

  async ngOnInit(): Promise<void> {
   await this.getRecipes();
  }

  private async getRecipes(): Promise<void> {
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