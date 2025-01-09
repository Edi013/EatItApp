export class RecipeDto {
    private _id: number;
    private _name: string;
    private _description: string;
    private _createdBy: string;
  
    constructor(id: number, name: string, description: string, createdBy: string) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._createdBy = createdBy;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get description(): string {
      return this._description;
    }
  
    set description(value: string) {
      this._description = value;
    }
  
    get createdBy(): string {
      return this._createdBy;
    }
  
    set createdBy(value: string) {
      this._createdBy = value;
    }
  }
  