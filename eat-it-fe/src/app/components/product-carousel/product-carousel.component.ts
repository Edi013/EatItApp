import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { ProductDto } from '../../models/dtos/product-dto';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { RecipeDto } from '../../models/dtos/recipe-dto';





@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, MatFormFieldModule, FormsModule],
})
export class ProductCarouselComponent{
  currentIndex: number = 0;
  filter: string = '';
  @Input() products: ProductDto[];

  constructor() {
    this.products = [];
  }

  get filteredProducts(): ProductDto[] {
    const filtered = this.products.filter(product =>
      product.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    if (this.currentIndex >= filtered.length) {
      this.currentIndex = 0; 
    }
    return filtered;
  }

  nextProduct(): void {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    }
  }

  previousProduct(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
