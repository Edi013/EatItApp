import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductDto } from '../../models/dtos/product-dto';  
import { ProductService } from '../../services/product.serice';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../services/utils/snackbar.service';

@Component({
  selector: 'product-create',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [
    CommonModule,
    TopBarComponent,
    ReactiveFormsModule 
  ]
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackbarService: SnackbarService
  ) {
    this.productForm = this.fb.group({
      id: [''], 
      name: ['', [Validators.required, Validators.minLength(3)]],
      value: [0.5, [Validators.required, Validators.min(0.5)]]
    });
  }

  ngOnInit(): void {}

  async onSubmit(){
    if (this.productForm.invalid) {
      return;
    }

    const newProduct: ProductDto = this.productForm.value;
    console.log('Sent product: '+ newProduct);
    var result = await this.productService.createProduct(newProduct);
    console.log('Received product: '+ result);
    if(result.item.name == newProduct.name && result.item.value == newProduct.value) {
      this.snackbarService.showSnackbar('Product created successfully');
    }
  }
}
