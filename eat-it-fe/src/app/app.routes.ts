import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';
import { UserRecipesComponent } from './components/user-recipes/user-recipes.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard]},
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'user-recipes', component: UserRecipesComponent, canActivate: [AuthGuard]},
    { path: 'create-recipe', component: CreateRecipeComponent, canActivate: [AuthGuard]},
    { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard]},
    { path: '404', component: NotFoundComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/404'},
    

];