import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service'; // Adjust the import path
import { RecipeDto } from '../../models/dtos/recipe-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemResponse } from '../../models/responses/item-response';
import { SnackbarService } from '../../services/utils/snackbar.service';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
  selector: 'create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    TopBarComponent,
    ReactiveFormsModule,
],
})
export class CreateRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private recipeService: RecipeService,
    private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      createdBy: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.recipeForm.valid) {
      const recipe: RecipeDto = new RecipeDto(
        0, 
        this.recipeForm.value.name,
        this.recipeForm.value.description,
        this.recipeForm.value.createdBy
      );

      console.log("Sent recipe: " + recipe);
      var response = await this.recipeService.createRecipe(recipe);
      var responseParsed = new ItemResponse<RecipeDto>(response.statusCode, response.message, response.status, response.item);
      console.log("Recived recipe: " + recipe);
      if(responseParsed === null || responseParsed.hasFailed()){
        console.log("Recipe was no created.");
        this.snackbarService.showSnackbar("Recipe was not created.");
        return;
      }

      console.log("Recipe was created.");
      this.snackbarService.showSnackbar("Recipe created successfully.");
    }
  }
}
