import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: '404', component: NotFoundComponent},
    { path: '**', redirectTo: '/404'},
];