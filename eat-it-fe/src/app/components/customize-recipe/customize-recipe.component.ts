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
  form: FormGroup;

  constructor(
    private recipeDetailsService: RecipeDetailsService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.form = this.fb.group({
      productSelection: this.fb.group({}),
    });
  }

  async ngOnInit(): Promise<void> {
    this.recipes = await this.fetchRecipes();
    this.products = await this.fetchProducts();

    // Initialize product selection form group
    const productSelectionGroup: { [key: string]: boolean } = {};
    this.products.forEach(product => {
      productSelectionGroup[product.id] = false;
    });

    this.form.setControl('productSelection', this.fb.group(productSelectionGroup));
  }

  async fetchRecipes(): Promise<RecipeDto[]> {
    // Replace with actual API call to get recipes
    return [];
  }

  async fetchProducts(): Promise<ProductDto[]> {
    // Replace with actual API call to get products
    return [];
  }

  async customizeRecipe(): Promise<void> {
    if (!this.selectedRecipe) {
      alert('Please select a recipe first.');
      return;
    }

    const productSelection = this.form.value.productSelection;
    const selectedProductIds = Object.keys(productSelection).filter(
      id => productSelection[id]
    );

    for (const productId of selectedProductIds) {
      const dto: ProductRecipeQuantityDto = {
        recipeId: this.selectedRecipe.id,
        productId: parseInt(productId),
        quantity: 100, 
      };

      const response: BaseResponse = await this.recipeDetailsService.putProductOnRecipe(dto);
      if (response.hasFailed()) {
        console.error(`Failed to assign product ${productId} to recipe ${this.selectedRecipe.id}`);
        this.snackbarService.showSnackbar('The product was not assigned to the recipe.');
      }
    }
    const message = 'Product successfully assigned to the recipe.';
    console.error(message);
    this.snackbarService.showSnackbar(message);
  }

  onProductSelected(product: ProductDto): void {
    this.selectedProduct = product;
  }

  onRecipeSelected(recipe: RecipeDto): void {
    this.selectedRecipe = recipe;
  }
}

