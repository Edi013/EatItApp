import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CookiesService } from '../../services/utils/cookies.service';
import { SnackbarService } from '../../services/utils/snackbar.service';


@Component({
  selector: 'top-bar',
  imports: [MatButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  username: string ;
  
  constructor(private router: Router, private cookiesService: CookiesService, private snackbarService: SnackbarService) {
    this.username = cookiesService.getUsername() || '';
  }

  navigateToCustomizeRecipe() {
    const url = '/customize-recipe';
    this.navigateTo(url, "Home");
  }

  navigateToCreateProduct() {
    const url = '/create-product';
    this.navigateTo(url, "Create Product");
  }

  navigateToCreateRecipe() {
    const url = '/create-recipe';   
    this.navigateTo(url, "Create Recipe");
  }
  
  navigateToUserRecipes() {
    const url = '/user-recipes';
    this.navigateTo(url, "Recipes");
  }

  navigateToProducts() {
    const url = '/products';

    this.navigateTo(url, "Products");
  }
  
  navigateToHome() {
    const url = '/home';
    this.navigateTo(url, "Home");
  }

  navigateTo(url: String, pageName: String){
    if(this.router.url === url) {
      return;
    }
    this.router.navigate([url]);
    this.snackbarService.showSnackbar("You are on " + pageName + " page now");
  }
}
