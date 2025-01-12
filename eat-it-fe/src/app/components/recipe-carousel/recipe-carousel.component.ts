import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css'],
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule, 
    FormsModule
  ]
})
export class RecipeCarouselComponent  {
  @Input() recipes: RecipeDto[] = [];
  currentIndex: number = 0;
  filter: string = '';

  constructor() {}

  get filteredProducts(): RecipeDto[] {
      const filtered = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.filter.toLowerCase())
      );
      if (this.currentIndex >= filtered.length) {
        this.currentIndex = 0; 
      }
      return filtered;
    }

  nextRecipe(): void {
    if (this.currentIndex < this.recipes.length - 1) {
      this.currentIndex++;
    }
  }

  previousRecipe(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
