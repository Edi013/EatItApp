import { Component, Input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { ProductDto } from '../../models/dtos/product-dto';
import { RecipeDetailsService } from '../../services/recipe-details.service';
import { ExtendedProductDto } from '../../models/dtos/extended-product-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { BaseResponse } from '../../models/responses/base-response';
import { SnackbarService } from '../../services/utils/snackbar.service';




@Component({
  selector: 'recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css'],
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule, 
    FormsModule,
    MatDividerModule,
  ]
})
export class RecipeCarouselComponent implements OnChanges {
  @Input() recipes: RecipeDto[] = [];
  @Input() userId: string = '';
  @Input() products: ProductDto[] = [];
  currentRecipe = output<RecipeDto>();
  currentIndex: number = 0;
  currentRecipeComposition: ExtendedProductDto[]= [];
  filter: string = '';
  filteredRecipesList: RecipeDto[] = [];
  private productsLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  productsLoaded$: Observable<boolean> = this.productsLoadedSubject.asObservable();

  constructor(
  private detailsService: RecipeDetailsService,
  private changeDetectorRef: ChangeDetectorRef,
  private router: Router,
  private recipeService: RecipeService,
  private snackbarService: SnackbarService) {} 

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['recipes'] && this.recipes.length > 0) {
      if(this.userId !== '') {
        this.recipes= this.recipes.filter(recipe => recipe.createdBy === this.userId);
      }
      this.filteredRecipesList = this.recipes;
      this.selectCurrentRecipe();
      await this.loadCurrentRecipeComposition(); 
    }
  }

  get filteredRecipes(): RecipeDto[] {
    this.filteredRecipesList =  this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    return this.filteredRecipesList;
  }  
  get currentEstimatedCost(): number{
    var result: number = 0;
    this.currentRecipeComposition.map(product => result += product.value * product.quantity / 100);
    return result;
  }

  async onFilterChange(): Promise<void> {
    await this.loadCurrentRecipeComposition();
    this.changeDetectorRef.detectChanges(); 
  }

  private async loadRecipeComposition(index: number): Promise<ExtendedProductDto[]> {
      var result = (await this.detailsService.getProductsByRecipeId(this.filteredRecipesList[index].id)).items;
      return result;
    }

  private async loadCurrentRecipeComposition(direction: number = 0): Promise<void> {
    if(this.filteredRecipesList.length === 0) {
      return;
    }

    this.productsLoadedSubject.next(false); 
    this.currentRecipeComposition = await this.loadRecipeComposition(this.currentIndex);
    await this.waitASecond();
    this.productsLoadedSubject.next(true); 
  }



  async nextRecipe(): Promise<void> {
    if (this.currentIndex < this.filteredRecipesList.length - 1) {
      this.currentIndex++;
      this.selectCurrentRecipe();
      await this.loadCurrentRecipeComposition(1);
    }
  }

  async previousRecipe(): Promise<void> {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectCurrentRecipe();
      await this.loadCurrentRecipeComposition(-1);
    }
  }

  private async waitASecond(){
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  private selectCurrentRecipe(): void {
    this.currentRecipe.emit(this.filteredRecipesList[this.currentIndex]);
  }

  private hasOwnedRecipesLoaded(): boolean {
    return this.router.url === environment.userRecipesUrl && this.userId !== '';
  }

  async deleteRecipe(): Promise<void> {
    const response = await this.recipeService.deleteRecipe(this.filteredRecipesList[this.currentIndex].id);
    var parsedResponse = new BaseResponse(response.statusCode, response.message, response.status);
    var message = '';
      if(parsedResponse.hasFailed()) {
        message = 'Failed to delete recipe';
        this.snackbarService.showSnackbar(message);
        console.log(message);
      }
    this.refreshPage();
    message = 'Successfully deleted recipe';
    this.snackbarService.showSnackbar(message);
    console.log(message);
  }

  refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
