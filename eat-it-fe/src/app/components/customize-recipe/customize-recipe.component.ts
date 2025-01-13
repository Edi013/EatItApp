import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { ProductDto } from '../../models/dtos/product-dto';
import { RecipeDetailsService } from '../../services/recipe-details.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductRecipeQuantityDto } from '../../models/dtos/product-recipe-quantity-dto';
import { BaseResponse } from '../../models/responses/base-response';
import { SnackbarService } from '../../services/utils/snackbar.service';
import { RecipeCarouselComponent } from '../recipe-carousel/recipe-carousel.component';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { ProductService } from '../../services/product.serice';
import { RecipeService } from '../../services/recipe.service';
import { CookiesService } from '../../services/utils/cookies.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-customize-recipe',
  imports: [
    CommonModule, 
    TopBarComponent,
    RecipeCarouselComponent, 
    ProductCarouselComponent,
    ReactiveFormsModule
  ],
  templateUrl: './customize-recipe.component.html',
  styleUrl: './customize-recipe.component.css'
})


export class CustomizeRecipeComponent implements OnInit {
  recipes: RecipeDto[] = [];
  products: ProductDto[] = [];
  selectedRecipe: RecipeDto | null = null;
  selectedProduct: ProductDto | null = null;
  userId: string;
  // form: FormGroup;
  errorMessage = '';

  constructor(
    private recipeDetailsService: RecipeDetailsService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private productService: ProductService,
    private recipeService: RecipeService,    
    private cookiesService: CookiesService,
    private router: Router
  ) {
    this.userId = this.cookiesService.getUserId() ?? "";
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
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

  async customizeRecipe(): Promise<void> {
    if (!this.selectedRecipe) {
      this.snackbarService.showSnackbar('Please select a recipe first.');
      return;
    }
    if (!this.selectedProduct) {
      this.snackbarService.showSnackbar('Please select a product first.');
      return;
    }

      const dto: ProductRecipeQuantityDto = {
        recipeId: this.selectedRecipe.id,
        productId: this.selectedProduct.id,
        quantity: 100, 
      };
      var message = "";
      const response: BaseResponse = await this.recipeDetailsService.putProductOnRecipe(dto);
      const responseParsed = new BaseResponse(response.statusCode, response.message, response.status);
      if (responseParsed.hasFailed()) {
        message = `Failed to assign product ${this.selectedProduct.id} to recipe ${this.selectedRecipe.id}`;
        console.error(message);
        this.snackbarService.showSnackbar(message);
      }
      this.refreshPage()
      message = 'Product successfully assigned to the recipe.';
      console.error(message);
      this.snackbarService.showSnackbar(message);
  }
  

  onProductSelected(product: ProductDto): void {
    this.selectedProduct = product;
  }

  onRecipeSelected(recipe: RecipeDto): void {
    this.selectedRecipe = recipe;
  }

  refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([environment.customizeRecipeUrl]);
    });
  }
}

