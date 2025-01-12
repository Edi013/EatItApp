import { Component } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCarouselComponent } from "../recipe-carousel/recipe-carousel.component";
import { ProductService } from '../../services/product.serice';
import { ProductDto } from '../../models/dtos/product-dto';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-home',
  imports: [
    RecipeCarouselComponent,
    ProductCarouselComponent,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  recipes: RecipeDto[] = [];
  products: ProductDto[] = [];
  errorMessage: string | null = null;

  constructor(private recipeService: RecipeService, private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
   await this.getRecipes();
   await this.getProducts();
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

  private async getProducts(): Promise<void> {
    try {
      const response = await this.productService.getAllProducts();
      if (response.hasFailed()) {
        this.errorMessage = 'Failed to fetch recipes';
      }
      this.products = response.items;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage = 'Error fetching recipes: ' + error.message;
      } else {
        this.errorMessage = 'Error fetching recipes';
      }
    }
  }
}
