export class RecipeDto {
    id: number;
    name: string;
    description: string;
    createdBy: string;
  
    constructor(id: number, name: string, description: string, createdBy: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.createdBy = createdBy;
    }
  }
  