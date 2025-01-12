import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCarouselComponent } from '../recipe-carousel/recipe-carousel.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { ProductService } from '../../services/product.serice';
import { ProductDto } from '../../models/dtos/product-dto';
import { CookiesService } from '../../services/utils/cookies.service';

@Component({
  selector: 'app-user-recipes',
  imports: [    
    RecipeCarouselComponent,
    TopBarComponent
  ],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css'
})
export class UserRecipesComponent implements OnInit {
    recipes: RecipeDto[] = [];
    products: ProductDto[] = [];
    errorMessage: string | null = null;
    currentUserId: string = '';

    constructor(private recipeService: RecipeService, private productService: ProductService, private cookiesSerice: CookiesService) {}
    
    async ngOnInit(): Promise<void> {
      this.currentUserId = this.cookiesSerice.getUserId() ?? '';
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
