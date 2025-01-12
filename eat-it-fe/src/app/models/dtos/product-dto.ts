export class ProductDto {
  id: number;
  name: string;
  value: number; // Value per 100g

  constructor(id: number, name: string, value: number) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
  