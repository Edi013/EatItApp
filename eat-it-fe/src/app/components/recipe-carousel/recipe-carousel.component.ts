import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  currentIndex: number = 0;
  currentRecipeComposition: ExtendedProductDto[]= [];
  filter: string = '';
  filteredRecipesList: RecipeDto[] = [];
  private productsLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  productsLoaded$: Observable<boolean> = this.productsLoadedSubject.asObservable();

  constructor(private detailsService: RecipeDetailsService, private changeDetectorRef: ChangeDetectorRef) {} 

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['recipes'] && this.recipes.length > 0) {
      this.filteredRecipesList = this.recipes;
      await this.loadCurrentRecipeComposition(); 
    }
  }

  //Access the getter only in html file
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
      await this.loadCurrentRecipeComposition(1);
    }
  }

  async previousRecipe(): Promise<void> {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      await this.loadCurrentRecipeComposition(-1);
    }
  }

  private async waitASecond(){
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}
