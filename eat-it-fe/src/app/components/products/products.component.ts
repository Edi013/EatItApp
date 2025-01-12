import { Component, OnInit } from '@angular/core';
import { ProductCarouselComponent } from "../product-carousel/product-carousel.component";
import { ProductDto } from '../../models/dtos/product-dto';
import { ProductService } from '../../services/product.serice';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-products',
  imports: [ProductCarouselComponent,
    TopBarComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  errorMessage: string | null = null;
  
  constructor(private productService: ProductService) {}
  
  async ngOnInit(): Promise<void> {
    await this.getProducts();
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
