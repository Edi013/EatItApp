export class ProductDto {
    id: number;
    name: string;
    value: number; // Value per 100g
  
    constructor(id: number, name: string, value: number) {
      this.id = id;
      this.name = name;
      this.value = value;
    }
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number): void {
      this.id = id;
    }
  
    getName(): string {
      return this.name;
    }
  
    setName(name: string): void {
      this.name = name;
    }
  
    getValue(): number {
      return this.value;
    }
  
    setValue(value: number): void {
      this.value = value;
    }
  }
  