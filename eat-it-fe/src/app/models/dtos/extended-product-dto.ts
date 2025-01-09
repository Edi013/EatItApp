import { ProductDto } from './product-dto';

export class ExtendedProductDto extends ProductDto {
  quantity: number;

  constructor(id: number, name: string, value: number, quantity: number) {
    super(id, name, value);
    this.quantity = quantity;
  }
}
