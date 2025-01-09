export class ProductRecipeQuantityDto {
    recipeId: number;
    productId: number;
    quantity: number;
  
    constructor(recipeId: number, productId: number, quantity: number) {
      this.recipeId = recipeId;
      this.productId = productId;
      this.quantity = quantity;
    }
  }
  