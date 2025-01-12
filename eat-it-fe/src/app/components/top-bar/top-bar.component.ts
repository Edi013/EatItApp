import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CookiesService } from '../../services/utils/cookies.service';


@Component({
  selector: 'top-bar',
  imports: [MatButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  username: string ;
  
  constructor(private router: Router, private cookiesService: CookiesService) {
    this.username = cookiesService.getUsername() || '';
  }

  navigateToCustomizeRecipe() {
    const url = '/customize-product';
    this.navigateTo(url);
  }

  navigateToCreateProduct() {
    const url = '/create-product';
    this.navigateTo(url);
  }

  navigateToCreateRecipe() {
    const url = '/create-recipe';   
    this.navigateTo(url);
  }
  
  navigateToUserRecipes() {
    const url = '/user-recipes';
    this.navigateTo(url);
  }

  navigateToProducts() {
    const url = '/products';

    this.navigateTo(url);
  }
  
  navigateToHome() {
    const url = '/home';
    this.navigateTo(url);
  }

  navigateTo(url: String){
    if(this.router.url === url) {
      return;
    }
    this.router.navigate([url]);
  }
}
