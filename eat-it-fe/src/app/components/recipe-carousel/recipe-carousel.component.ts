import { Component, Input, OnInit } from '@angular/core';
import { RecipeDto } from '../../models/dtos/recipe-dto';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';




@Component({
  selector: 'recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css'],
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class RecipeCarouselComponent  {
  filteredRecipes: RecipeDto[] = [];
  @Input() recipes: RecipeDto[] = [];
  currentIndex: number = 0;

  constructor() {}

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
