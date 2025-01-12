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
import { CookiesService } from '../../services/utils/cookies.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  createdSuccessfully = false;
  
  constructor(
    private fb: FormBuilder, 
    private recipeService: RecipeService,
    private snackbarService: SnackbarService,
    private cookiesService: CookiesService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  
  async onSubmit(): Promise<void> {
    try{
      this.createdSuccessfully = false;
      if (this.recipeForm.valid) {
        var userId = this.cookiesService.getUserId();
        if(!userId){
          throw new Error("User id was not present, but it was expected.");
        }
        const recipe: RecipeDto = new RecipeDto(
          0, 
          this.recipeForm.value.name,
          this.recipeForm.value.description,
          userId
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
        this.createdSuccessfully = true;
      }
    } catch (error: any) {
      console.error("Unexpected error creating recipe: " + (error.message ?? "error doesn't have any mesage attached"));
      this.snackbarService.showSnackbar("Unexpected error creating recipe.");
    }
  }
  navigateToCustomizeRecipe() {
    this.router.navigate([environment.customizeRecipeUrl]);
  }
}
