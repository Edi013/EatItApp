import { Component, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { ProductDto } from '../../models/dtos/product-dto';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatButtonModule, FormsModule],
})
export class ProductCarouselComponent implements OnChanges{
  currentIndex: number = 0;
  filter: string = '';
  @Input() products: ProductDto[];
  currentProduct = output<ProductDto>();;

  constructor(private router: Router) {
    this.products = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products.length > 0) {
      this.selectCurrentProduct();
    }  
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
      this.selectCurrentProduct();
    }
  }

  previousProduct(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectCurrentProduct();
    }
  }

  private selectCurrentProduct(): void {
    this.currentProduct.emit(this.products[this.currentIndex]);
  }

  navigateToCreateProduct(){
    this.router.navigate([environment.createProductUrl]);
  }
}
