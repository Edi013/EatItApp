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
  
  navigateToUserRecipes() {
    const url = '/user-recipes';
    if(this.router.url === url) {
      return;
    }
    this.router.navigate([url]);
  }

  navigateToProducts() {
    const url = '/products';

    if(this.router.url === url) {
      return;
    }
    this.router.navigate([url]);
  }
  
  navigateToHome() {
    const url = '/home';
    if(this.router.url === url) {
      return;
    }
    this.router.navigate([url]);
  }
}
